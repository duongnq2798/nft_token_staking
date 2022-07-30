import { AccountData } from 'utils/common'

import { useEnvironmentCtx } from 'providers/EnvironmentProvider'
import { useQuery } from 'react-query'
import { useStakePoolId } from './useStakePoolId'
import { getStatsEntry, StatsEntryData } from 'utils/stats/programs/cardinalStats'
import { useAccountChange } from './useAccountChange'

export const useStats = () => {
  const { secondaryConnection } = useEnvironmentCtx()
  const stakePoolId = useStakePoolId()
  const wallet = useAccountChange()
  return useQuery<
    | {
        [name: string]: { data: AccountData<StatsEntryData> }
      }
    | undefined
  >(
    ['useStats', stakePoolId?.toString()],
    async () => {
      const statsNames = [
        'total-active-staked-tokens',
        'total-active-stake-entries',
      ]
      const statsData = await Promise.all(
        statsNames.map((name) => getStatsEntry(secondaryConnection, name, wallet))
      )
      return statsData.reduce(
        (acc, stat) => {
          const displayName = statsNameMapping.find(
            (mapp) => mapp.key === stat.parsed.name
          )!.displayName
          acc[displayName] = { data: stat }
          return acc
        },
        {} as {
          [name: string]: { data: AccountData<StatsEntryData> }
        }
      )
    },
    {
      refetchInterval: 3000,
    }
  )
}

const statsNameMapping = [
  {
    key: 'total-active-staked-tokens',
    displayName: 'Total Staked Tokens',
  },
  {
    key: 'total-active-stake-entries',
    displayName: 'Total Staked Entries',
  },
]
