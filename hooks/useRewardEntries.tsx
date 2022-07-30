import { useEnvironmentCtx } from 'providers/EnvironmentProvider'
import { AccountData } from 'utils/common'
import { useRewardDistributorData } from './useRewardDistributorData'
import { findRewardEntryId } from 'utils/staking/programs/rewardDistributor/pda'
import { useStakedTokenDatas } from './useStakedTokenDatas'
// import { RewardEntryData } from 'utils/staking/programs/rewardDistributor'
import { getRewardEntries } from 'utils/staking/programs/rewardDistributor/accounts'
import { useQuery } from 'react-query'
import { RewardEntryData } from 'utils/staking/programs/rewardDistributor'
import { useAccountChange } from './useAccountChange'

export const useRewardEntries = () => {
  const { data: rewardDistibutorData } = useRewardDistributorData()
  const { data: stakedTokenDatas } = useStakedTokenDatas()
  const { secondaryConnection } = useEnvironmentCtx()
  const wallet = useAccountChange()
  return useQuery<AccountData<RewardEntryData>[] | undefined>(
    [
      'useRewardEntries',
      rewardDistibutorData?.pubkey?.toString(),
      stakedTokenDatas,
    ],
    async () => {
      const rewardDistibutorId = rewardDistibutorData?.pubkey
      if (!rewardDistibutorData || !stakedTokenDatas || !rewardDistibutorId) {
        return []
      }
      const stakeEntryIds = stakedTokenDatas
        .filter((tk) => tk && tk.stakeEntry)
        .map((tk) => tk.stakeEntry!)
        .map((entry) => entry.pubkey)

      const rewardEntryIds = await Promise.all(
        stakeEntryIds.map(
          async (stakeEntryId) =>
            (
              await findRewardEntryId(rewardDistibutorId, stakeEntryId)
            )[0]
        )
      )

      return (
        await getRewardEntries(secondaryConnection, rewardEntryIds, wallet)
      ).filter((rewardEntry) => rewardEntry.parsed)
    }
  )
}
