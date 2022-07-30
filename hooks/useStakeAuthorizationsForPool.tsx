import { AccountData } from 'utils/common'
import { StakeAuthorizationData } from 'utils/staking/programs/stakePool'
import { getStakeAuthorizationsForPool } from 'utils/staking/programs/stakePool/accounts'
import { useEnvironmentCtx } from 'providers/EnvironmentProvider'
import { useStakePoolId } from './useStakePoolId'
import { useQuery } from 'react-query'

export const useStakeAuthorizationsForPool = () => {
  const { secondaryConnection } = useEnvironmentCtx()
  const stakePoolId = useStakePoolId()
  return useQuery<AccountData<StakeAuthorizationData>[] | undefined>(
    ['useStakeAuthorizationsForPool', stakePoolId?.toString()],
    async () => {
      if (stakePoolId) {
        return getStakeAuthorizationsForPool(secondaryConnection, stakePoolId)
      }
    },
    { enabled: !!stakePoolId }
  )
}
