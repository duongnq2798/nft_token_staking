import { useEnvironmentCtx } from 'providers/EnvironmentProvider'
import { useStakePoolId } from './useStakePoolId'
// import { findRewardDistributorId } from 'utils/staking/programs/rewardDistributor/pda'
// import { getRewardDistributor } from 'utils/staking/programs/rewardDistributor/accounts'
import { AccountData } from 'utils/common'
import { RewardDistributorData } from 'utils/staking/programs/rewardDistributor'
import { useQuery } from 'react-query'
import { findRewardDistributorId } from 'utils/staking/programs/rewardDistributor/pda'
import { getRewardDistributor } from 'utils/staking/programs/rewardDistributor/accounts'
import { useAccountChange } from './useAccountChange'

export const useRewardDistributorData = () => {
  const stakePoolId = useStakePoolId()
  const { secondaryConnection } = useEnvironmentCtx()
  const wallet = useAccountChange()
  return useQuery<AccountData<RewardDistributorData> | undefined>(
    ['useRewardDistributorData', stakePoolId?.toString()],
    async () => {
      if (!stakePoolId) return
      const [rewardDistributorId] = await findRewardDistributorId(stakePoolId)
      return await getRewardDistributor(
        secondaryConnection,
        rewardDistributorId,
        wallet
      )
    },
    { enabled: !!stakePoolId }
  )
}
