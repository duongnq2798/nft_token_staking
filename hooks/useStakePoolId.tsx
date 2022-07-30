import { PublicKey } from '@solana/web3.js'
import {
  NEXT_PUBLIC_STAKE_POOL_NFT_ID,
  NEXT_PUBLIC_STAKE_POOL_TOKEN_ID,
} from 'constants/staking'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export const useStakePoolId = () => {
  const router = useRouter()

  const [pubkey, setPubkey] = useState<PublicKey>()

  useEffect(() => {
    if (router.pathname === '/token-staking') {
      const publickey = new PublicKey(NEXT_PUBLIC_STAKE_POOL_TOKEN_ID)
      setPubkey(publickey)
    } else {
      const publickey = new PublicKey(NEXT_PUBLIC_STAKE_POOL_NFT_ID)

      setPubkey(publickey)
    }
  }, [router])

  return pubkey
}
