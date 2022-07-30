// import { AccountData } from 'utils/common'
// import { StakePoolData } from 'staking/programs/stakePool'
import { useEnvironmentCtx } from 'providers/EnvironmentProvider'
import { useStakePoolId } from './useStakePoolId'
// import { getStakePool } from 'staking/programs/stakePool/accounts'
import { useQuery } from 'react-query'
// import { getStakePool } from 'utils/staking/programs/stakePool/accounts'
import { StakePoolData } from 'utils/staking/programs/stakePool'
import { AccountData } from 'utils/common'
// import { NEXT_PUBLIC_STAKE_POOL_ID } from 'constants/staking'
import { getStakePool } from 'utils/staking/programs/stakePool/accounts'
import { useAccountChange } from './useAccountChange'

export const useStakePoolData = () => {
  const stakePoolId = useStakePoolId()
  const { secondaryConnection } = useEnvironmentCtx()
  const wallet = useAccountChange()
  
  return useQuery<AccountData<StakePoolData> | undefined>(
    ['stakePoolData', stakePoolId?.toString()],
    async () => {
      if (!stakePoolId) return
      return getStakePool(secondaryConnection, stakePoolId, wallet)
    },
    {
      enabled: true,
      cacheTime: 0,
      refetchOnMount: true
    }
  )
  
}
