import { AccountData } from 'utils/common'
import { StakePoolData } from 'utils/staking/programs/stakePool'
import { getAllStakePools } from 'utils/staking/programs/stakePool/accounts'
import { useEnvironmentCtx } from 'providers/EnvironmentProvider'
import { useQuery } from 'react-query'
import { useStakePoolId } from './useStakePoolId'
import { StakePoolMetadata, stakePoolMetadatas } from 'api/mapping'

export type StakePool = {
  stakePoolMetadata?: StakePoolMetadata
  stakePoolData: AccountData<StakePoolData>
}

export const useAllStakePools = () => {
  const { secondaryConnection } = useEnvironmentCtx()
  const stakePoolId = useStakePoolId()
  return useQuery<
    | {
        stakePoolsWithMetadata: StakePool[]
        stakePoolsWithoutMetadata: StakePool[]
      }
    | undefined
  >(['useAllStakePools', stakePoolId?.toString()], async () => {
    const allStakePoolDatas = await getAllStakePools(secondaryConnection)
    const [stakePoolsWithMetadata, stakePoolsWithoutMetadata] =
      allStakePoolDatas.reduce(
        (acc, stakePoolData) => {
          const stakePoolMetadata = stakePoolMetadatas.find(
            (md) =>
              md.stakePoolAddress.toString() === stakePoolData.pubkey.toString()
          )
          if (stakePoolMetadata) {
            return [[...acc[0], { stakePoolMetadata, stakePoolData }], acc[1]]
          }
          return [acc[0], [...acc[1], { stakePoolData }]]
        },
        [[] as StakePool[], [] as StakePool[]]
      )
    return {
      stakePoolsWithMetadata: stakePoolsWithMetadata.sort((a, b) =>
        a
          .stakePoolMetadata!.name.toString()
          .localeCompare(b.stakePoolMetadata!.name.toString())
      ),
      stakePoolsWithoutMetadata: stakePoolsWithoutMetadata,
    }
  })
}
