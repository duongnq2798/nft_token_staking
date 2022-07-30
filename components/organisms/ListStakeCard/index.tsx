import StakeCard from 'components/molecules/StakeCard'
import { NFTStatus } from 'constants/staking'
import { FC } from 'react'
import { Wrapper } from './styles'
import { IListStakeCard } from './types'


const ListStakeCard: FC<IListStakeCard> = ({
  loading,
  currentTkAddress,
  datas,
  handleStake,
  handleUnstake,
  handleClaimRewards,
  selectStakedToken,
  selectUnstakedToken,
}) => {

  return (
    <Wrapper>
      {datas &&
        datas.length ?
        datas.map((item, index) => {
          const isLoad = (currentTkAddress === item.metadata.pubkey.toString() ? true : false)
          return (
            <StakeCard
              loading={[...loading, isLoad]}
              key={index}
              src={item.metadata?.data.image || item.tokenListData?.logoURI}
              title={item.metadata?.data.name || item.tokenListData?.symbol}
              content={item?.metadata?.data?.description}
              status={item.state}
              onClick={() => {
                item.state !== NFTStatus.STAKED
                  ? selectUnstakedToken(item)
                  : selectStakedToken(item)
                item.state === NFTStatus.STAKED
                  ? handleUnstake(item)
                  : handleStake(item)
              }}
              handleClaimRewards={() => handleClaimRewards(item)}
            />
          )
        }) : null}
    </Wrapper>
  )
}

export default ListStakeCard
