import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import * as splToken from '@solana/spl-token'
import { useRouter } from 'next/router'
import { TokenStandard } from 'api/mapping'
import { useEnvironmentCtx } from 'providers/EnvironmentProvider'
import { useUTCNow } from 'providers/UTCNowProvider'
import { useEffect, useState } from 'react'
import { ReceiptType } from 'utils/staking/programs/stakePool'

import {
  formatAmountAsDecimal,
  formatMintNaturalAmountAsDecimal,
  getMintDecimalAmountFromNatural,
  parseMintNaturalAmountFromDecimal,
} from 'common/units'
import { BN } from '@project-serum/anchor'
import Header from 'components/molecules/Header'
import styled from 'styled-components'
import Stats from 'components/molecules/Stats'
import { notify } from 'common/Notification'
import { PublicKey, Signer, Transaction } from '@solana/web3.js'
import { Wallet } from '@metaplex/js'
import {
  claimRewards,
  createStakeEntryAndStakeMint,
  stake,
  unstake,
} from 'utils/staking'
import { executeAllTransactions } from 'api/utils'
import Footer from 'components/molecules/Footer'
import { addNewAttributeForEachElement } from 'utils/common/array'
import TokenCard from 'components/molecules/TokenCard'
import { LoadingSpinner } from 'common/LoadingSpinner'
import { focusManager } from 'react-query'
import {
  AllowedTokenData,
  StakeEntryTokenData,
  useAccountChange,
  useAllowedTokenDatas,
  useRewardDistributorData,
  useRewardDistributorTokenAccount,
  useRewardEntries,
  useRewardMintInfo,
  useRewards,
  useStakedTokenDatas,
  useStakePoolData,
  useStakePoolEntries,
  useStakePoolMaxStaked,
  useStakePoolMetadata,
} from 'hooks'
import CustomHead from 'components/atoms/CustomHead'
import NoWallet from 'components/molecules/NoWallet'

const Container = styled.div`
  max-width: 1440px;
  margin-left: auto;
  margin-right: auto;
`
const TokenStaking = () => {
  const router = useRouter()
  const wallet = useAccountChange()
  const { connection } = useEnvironmentCtx()
  const walletModal = useWalletModal()
  const { data: stakePool, isFetched: stakePoolLoaded } = useStakePoolData()

  const stakedTokenDatas = useStakedTokenDatas()
  const rewardDistributorData = useRewardDistributorData()
  const rewardMintInfo: any = useRewardMintInfo()
  const stakePoolEntries = useStakePoolEntries()
  const maxStaked = useStakePoolMaxStaked()
  const rewardEntries = useRewardEntries()
  const rewards = useRewards()

  const [unstakedSelected, setUnstakedSelected] = useState<AllowedTokenData[]>(
    []
  )
  const [stakedSelected, setStakedSelected] = useState<StakeEntryTokenData[]>(
    []
  )
  const [loadingStake, setLoadingStake] = useState(false)
  const [loadingUnstake, setLoadingUnstake] = useState(false)
  const [totalStaked, setTotalStaked] = useState('')
  const [receiptType, setReceiptType] = useState<ReceiptType>(
    ReceiptType.Original
  )
  const [loadingClaimRewards, setLoadingClaimRewards] = useState(false)
  const [showFungibleTokens, setShowFungibleTokens] = useState(true)
  const allowedTokenDatas = useAllowedTokenDatas(true)
  const { data: stakePoolMetadata } = useStakePoolMetadata()
  const rewardDistributorTokenAccountData = useRewardDistributorTokenAccount()
  const { UTCNow } = useUTCNow()
  
  useEffect(() => {
    focusManager.setFocused(false)

    setTimeout(() => {
      focusManager.setFocused(true)
    }, 1000)
  }, [])

  useEffect(() => {
    focusManager.setFocused(true)
  }, [router, wallet])

  useEffect(() => {
    stakePoolMetadata?.tokenStandard &&
      setShowFungibleTokens(
        stakePoolMetadata?.tokenStandard === TokenStandard.Fungible
      )
  }, [stakePoolMetadata?.name, router])
  console.log("stakePoolMetadata", stakePoolMetadata)
  async function handleClaimRewards(tk: any) {
    const stakedSelected = [tk]
    if (stakedSelected.length > 4) {
      notify({ message: `Limit of 4 tokens at a time reached`, type: 'error' })
      return
    }
    setLoadingClaimRewards(true)
    if (!wallet) {
      throw new Error('Wallet not connected')
    }
    if (!stakePool) {
      notify({ message: `No stake pool detected`, type: 'error' })
      return
    }

    const txs: (Transaction | null)[] = await Promise.all(
      stakedSelected.map(async (token) => {
        try {
          if (!token || !token.stakeEntry) {
            throw new Error('No stake entry for token')
          }
          return claimRewards(connection, wallet as Wallet, {
            stakePoolId: stakePool.pubkey,
            stakeEntryId: token.stakeEntry.pubkey,
          })
        } catch (e) {
          notify({
            message: `${e}`,
            description: `Failed to claim rewards for token ${token?.stakeEntry?.pubkey.toString()}`,
            type: 'error',
          })
          return null
        }
      })
    )

    try {
      await executeAllTransactions(
        connection,
        wallet as Wallet,
        txs.filter((tx): tx is Transaction => tx !== null),
        {
          notificationConfig: {
            message: 'Successfully claimed rewards',
            description: 'These rewards are now available in your wallet',
          },
        }
      )
    } catch (e) {}

    rewardDistributorData.remove()
    rewardDistributorTokenAccountData.remove()
    setLoadingClaimRewards(false)
  }

  async function handleStake() {
    if (!wallet.connected) {
      notify({ message: `Wallet not connected`, type: 'error' })
      return
    }
    if (!stakePool) {
      notify({ message: `Wallet not connected`, type: 'error' })
      return
    }
    setLoadingStake(true)

    const initTxs: { tx: Transaction; signers: Signer[] }[] = []
    for (let step = 0; step < unstakedSelected.length; step++) {
      try {
        let token = unstakedSelected[step]
        if (!token || !token.tokenAccount) {
          throw new Error('Token account not set')
        }

        if (
          token.tokenAccount?.account.data.parsed.info.tokenAmount.amount > 1 &&
          !token.amountToStake
        ) {
          throw new Error('Invalid amount chosen for token')
        }
        if (receiptType === ReceiptType.Receipt) {
          console.log('Creating stake entry and stake mint...')
          const [initTx, , stakeMintKeypair] =
            await createStakeEntryAndStakeMint(connection, wallet as Wallet, {
              stakePoolId: stakePool?.pubkey,
              originalMintId: new PublicKey(
                token.tokenAccount.account.data.parsed.info.mint
              ),
            })
          if (initTx.instructions.length > 0) {
            initTxs.push({
              tx: initTx,
              signers: stakeMintKeypair ? [stakeMintKeypair] : [],
            })
          }
        }
      } catch (e) {
        notify({
          message: `Failed to stake token ${unstakedSelected[
            step
          ]?.stakeEntry?.pubkey.toString()}`,
          description: `${e}`,
          type: 'error',
        })
      }
    }

    if (initTxs.length > 0) {
      try {
        await executeAllTransactions(
          connection,
          wallet as Wallet,
          initTxs.map(({ tx }) => tx),
          {
            signers: initTxs.map(({ signers }) => signers),
            notificationConfig: {
              message: `Successfully staked`,
              description: 'Stake progress will now dynamically update',
            },
          }
        )
      } catch (e) {}
    }

    const txs: (Transaction | null)[] = await Promise.all(
      unstakedSelected.map(async (token) => {
        try {
          if (!token || !token.tokenAccount) {
            throw new Error('Token account not set')
          }

          if (
            token.tokenAccount?.account.data.parsed.info.tokenAmount.amount >
              1 &&
            !token.amountToStake
          ) {
            throw new Error('Invalid amount chosen for token')
          }

          if (
            token.stakeEntry &&
            token.stakeEntry.parsed.amount.toNumber() > 0
          ) {
            throw new Error(
              'Fungible tokens already staked in the pool. Staked tokens need to be unstaked and then restaked together with the new tokens.'
            )
          }

          const amount = token?.amountToStake
            ? new BN(
                token?.amountToStake && token.tokenListData
                  ? parseMintNaturalAmountFromDecimal(
                      token?.amountToStake,
                      token.tokenListData.decimals
                    ).toString()
                  : 1
              )
            : undefined
          // stake
          return stake(connection, wallet as Wallet, {
            stakePoolId: stakePool?.pubkey,
            receiptType:
              !amount || (amount && amount.eq(new BN(1)))
                ? receiptType
                : undefined,
            originalMintId: new PublicKey(
              token.tokenAccount.account.data.parsed.info.mint
            ),
            userOriginalMintTokenAccountId: token.tokenAccount?.pubkey,
            amount: amount,
          })
        } catch (e) {
          notify({
            message: `Failed to unstake token ${token?.stakeEntry?.pubkey.toString()}`,
            description: `${e}`,
            type: 'error',
          })
          return null
        }
      })
    )

    try {
      await executeAllTransactions(
        connection,
        wallet as Wallet,
        txs.filter((tx): tx is Transaction => tx !== null),
        {
          notificationConfig: {
            message: `Successfully staked`,
            description: 'Stake progress will now dynamically update',
          },
        }
      )
    } catch (e) {}

    await Promise.all([
      stakedTokenDatas.remove(),
      allowedTokenDatas.remove(),
      stakePoolEntries.remove(),
    ]).then(() =>
      setTimeout(() => {
        stakedTokenDatas.refetch()
        allowedTokenDatas.refetch()
        stakePoolEntries.refetch()
      }, 2000)
    )
    setStakedSelected([])
    setUnstakedSelected([])
    setLoadingStake(false)
  }

  async function handleUnstake(tk: any) {
    const stakedSelected = [tk]
    if (!wallet.connected) {
      notify({ message: `Wallet not connected`, type: 'error' })
      return
    }
    if (!stakePool) {
      notify({ message: `No stake pool detected`, type: 'error' })
      return
    }
    setLoadingUnstake(true)

    const txs: (Transaction | null)[] = await Promise.all(
      stakedSelected.map(async (token) => {
        try {
          if (!token || !token.stakeEntry) {
            throw new Error('No stake entry for token')
          }
          if (
            stakePool.parsed.cooldownSeconds &&
            !token.stakeEntry?.parsed.cooldownStartSeconds &&
            !stakePool.parsed.minStakeSeconds
          ) {
            notify({
              message: `Cooldown period will be initiated for ${token.metaplexData?.data.data.name} unless minimum stake period unsatisfied`,
              type: 'info',
            })
          }
          return unstake(connection, wallet as Wallet, {
            stakePoolId: stakePool?.pubkey,
            originalMintId: token.stakeEntry.parsed.originalMint,
          })
        } catch (e) {
          notify({
            message: `${e}`,
            description: `Failed to unstake token ${token?.stakeEntry?.pubkey.toString()}`,
            type: 'error',
          })
          return null
        }
      })
    )

    try {
      await executeAllTransactions(
        connection,
        wallet as Wallet,
        txs.filter((tx): tx is Transaction => tx !== null),
        {
          notificationConfig: {
            message: 'Successfully unstaked',
            description: 'These tokens are now available in your wallet',
          },
        }
      )
    } catch (e) {}

    await Promise.all([
      stakedTokenDatas.remove(),
      allowedTokenDatas.remove(),
      stakePoolEntries.remove(),
    ]).then(() =>
      setTimeout(() => {
        stakedTokenDatas.refetch()
        allowedTokenDatas.refetch()
        stakePoolEntries.refetch()
      }, 2000)
    )
    setStakedSelected([])
    setUnstakedSelected([])
    setLoadingUnstake(false)
  }

  const selectStakedToken = (tk: StakeEntryTokenData) => {
    if (loadingStake || loadingUnstake) return
    if (
      tk.stakeEntry?.parsed.lastStaker.toString() !==
      wallet.publicKey?.toString()
    ) {
      return
    }
    if (isStakedTokenSelected(tk)) {
      setStakedSelected(
        stakedSelected.filter(
          (data) =>
            data.stakeEntry?.pubkey.toString() !==
            tk.stakeEntry?.pubkey.toString()
        )
      )
    } else {
      setStakedSelected([...stakedSelected, tk])
    }
  }

  const selectUnstakedToken = (tk: AllowedTokenData, targetValue?: string) => {
    if (loadingStake || loadingUnstake) return
    const amount = Number(targetValue)
    if (tk.tokenAccount?.account.data.parsed.info.tokenAmount.amount > 1) {
      let newUnstakedSelected = unstakedSelected.filter(
        (data) =>
          data.tokenAccount?.account.data.parsed.info.mint.toString() !==
          tk.tokenAccount?.account.data.parsed.info.mint.toString()
      )
      if (targetValue && targetValue?.length > 0 && !amount) {
        notify({
          message: 'Please enter a valid amount',
          type: 'error',
        })
      } else if (targetValue) {
        tk.amountToStake = targetValue.toString()
        newUnstakedSelected = [...newUnstakedSelected, tk]
        setUnstakedSelected(newUnstakedSelected)
        return
      }

      setUnstakedSelected(
        unstakedSelected.filter(
          (data) =>
            data.tokenAccount?.account.data.parsed.info.mint.toString() !==
            tk.tokenAccount?.account.data.parsed.info.mint.toString()
        )
      )
    } else {
      if (isUnstakedTokenSelected(tk)) {
        setUnstakedSelected(
          unstakedSelected.filter(
            (data) =>
              data.tokenAccount?.account.data.parsed.info.mint.toString() !==
              tk.tokenAccount?.account.data.parsed.info.mint.toString()
          )
        )
      } else {
        setUnstakedSelected([...unstakedSelected, tk])
      }
    }
  }

  const isUnstakedTokenSelected = (tk: AllowedTokenData) =>
    unstakedSelected.some(
      (utk) =>
        utk.tokenAccount?.account.data.parsed.info.mint.toString() ===
        tk.tokenAccount?.account.data.parsed.info.mint.toString()
    )

  const isStakedTokenSelected = (tk: StakeEntryTokenData) =>
    stakedSelected.some(
      (stk) =>
        stk.stakeEntry?.parsed.originalMint.toString() ===
        tk.stakeEntry?.parsed.originalMint.toString()
    )

  const totalStakedTokens = async () => {
    let total = 0

    if (!stakePoolEntries.data) {
      setTotalStaked('0')
      return
    }
    const mintToDecimals: { mint: string; decimals: number }[] = []
    for (const entry of stakePoolEntries.data) {
      try {
        if (entry.parsed.amount.toNumber() > 1) {
          let decimals = 0
          const match = mintToDecimals.find(
            (m) => m.mint === entry.parsed.originalMint.toString()
          )
          if (match) {
            decimals = match.decimals
          } else {
            const mint = new splToken.Token(
              connection,
              entry.parsed.originalMint,
              splToken.TOKEN_PROGRAM_ID,
              // @ts-ignore
              null
            )
            // TODO:
            const mintInfo = await mint.getMintInfo()
            decimals = mintInfo.decimals
            mintToDecimals.push({
              mint: entry.parsed.originalMint.toString(),
              decimals: decimals,
            })
          }
          total += entry.parsed.amount.toNumber() / 10 ** decimals
        } else {
          total += 1
        }
      } catch (e) {
        console.log('Error calculating total staked tokens', e)
      }
    }
    setTotalStaked(Math.ceil(total).toString())
  }

  const getTokens = () => {
    const unstakeNFT = addNewAttributeForEachElement(
      {
        state: 'unstake',
      },
      (!stakePoolMetadata?.notFound && allowedTokenDatas.data) || []
    )

    const stakedNFT = addNewAttributeForEachElement(
      {
        state: 'staked',
      },
      (!stakePoolMetadata?.notFound &&
        stakedTokenDatas.data &&
        stakedTokenDatas.data) ||
        []
    )

    return {
      notStakeToken: unstakeNFT,
      stakedToken: stakedNFT,
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await totalStakedTokens()
    }
    fetchData().catch(console.error)
  }, [stakePoolEntries.isFetched, router])

  if (!stakePoolLoaded) {
    return null
  }

  return (
    <>
      <CustomHead key={'token stake'} title="Token staking" />
      <Container>
        <Header />
        <Stats
          totalStaked={totalStaked}
          maxStaked={stakePoolMetadata?.maxStaked}
          percentStaked={stakePoolEntries.data?.length}
          rewardRate={
            rewardDistributorData.data && rewardMintInfo.data
              ? (
                  (Number(
                    getMintDecimalAmountFromNatural(
                      rewardMintInfo.data.mintInfo,
                      (
                        stakedTokenDatas.data?.map((stakeData) =>
                          (
                            stakeData.stakeEntry?.parsed.amount || new BN(1)
                          ).mul(
                            (
                              rewardEntries.data?.find(
                                (entryData) =>
                                  entryData.parsed.stakeEntry.toString() ===
                                  stakeData.stakeEntry?.pubkey.toString()
                              )?.parsed.multiplier ||
                              rewardDistributorData.data!.parsed
                                .defaultMultiplier
                            ).div(
                              new BN(10).pow(
                                new BN(
                                  rewardDistributorData.data?.parsed
                                    .multiplierDecimals || 0
                                )
                              )
                            ) || new BN(1)
                          )
                        ) || []
                      )
                        .reduce((pre, curr) => pre.add(curr), new BN(0))
                        .mul(rewardDistributorData.data.parsed.rewardAmount)
                    )
                  ) /
                    rewardDistributorData.data.parsed.rewardDurationSeconds.toNumber()) *
                  86400 *
                  (rewardDistributorData.data.parsed.defaultMultiplier.toNumber() /
                    10 ** rewardDistributorData.data.parsed.multiplierDecimals)
                ).toPrecision(4)
              : ''
          }
          earning={
            rewardMintInfo && rewardMintInfo.data && rewards.data
              ? formatMintNaturalAmountAsDecimal(
                  rewardMintInfo?.data?.mintInfo,
                  rewards.data?.claimableRewards,
                  6
                )
              : ''
          }
        />
        <NoWallet />
        {(getTokens().notStakeToken || []).map(
          (tk: AllowedTokenData, index) => {
            return (
              <TokenCard
                ntk={getTokens().notStakeToken[0]}
                stk={getTokens().stakedToken[0]}
                key={index}
                balance={
                  rewardMintInfo.data && rewardMintInfo.data
                    ? formatAmountAsDecimal(
                        rewardMintInfo.data?.mintInfo.decimals,
                        tk.tokenAccount?.account.data.parsed.info.tokenAmount
                          .amount,
                        rewardMintInfo.data?.mintInfo.decimals
                      )
                    : '0'
                }
                selectUnstakedToken={selectUnstakedToken}
                // selectStakedToken={selectStakedToken}
                handleStake={handleStake}
                handleUnstake={handleUnstake}
                handleClaimRewards={handleClaimRewards}
                amountToClaim={
                  getTokens().stakedToken &&
                  getTokens().stakedToken.length &&
                  getTokens().stakedToken[0].stakeEntry &&
                  rewardMintInfo &&
                  rewardMintInfo.data &&
                  rewardMintInfo.data.mintInfo
                    ? formatMintNaturalAmountAsDecimal(
                        rewardMintInfo.data.mintInfo,
                        rewards.data?.rewardMap[
                          getTokens().stakedToken[0].stakeEntry.pubkey.toString()
                        ]?.claimableRewards || new BN(0),
                        rewardMintInfo.data.mintInfo.decimals
                      ).toLocaleString()
                    : '0'
                }
                loadingStake={loadingStake}
                loadingUnStake={loadingUnstake}
                loadingClaim={loadingClaimRewards}
              />
            )
          }
        )}

        {allowedTokenDatas.isRefetching && allowedTokenDatas.isFetched && (
          <LoadingSpinner
            fill={
              stakePoolMetadata?.colors?.fontColor
                ? stakePoolMetadata?.colors?.fontColor
                : '#FFF'
            }
            height="25px"
          />
        )}
      </Container>
      <Footer />
    </>
  )
}

export default TokenStaking
