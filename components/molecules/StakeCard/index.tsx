import { LoadingSpinner } from 'common/LoadingSpinner'
import { NFTStatus } from 'constants/staking'
import { FC } from 'react'
import { Button, Card, CardContent, CardText, CardTitle, GroupButton, NFTImage, RowCenter, Wrapper } from './styles'
import { IStakeCard } from './type'

const StakeCard: FC<IStakeCard> = ({
  src,
  title,
  content,
  status,
  loading,
  onClick,
  handleClaimRewards,
}) => {

  return (
    <Wrapper>
      <Card>
        <NFTImage src={src} />
        <CardContent>
          <CardTitle>{title}</CardTitle>
          <CardText>{content}</CardText>
          {status === NFTStatus.STAKED ? (
            <GroupButton>
              <Button onClick={onClick}>
                {loading[1] && loading[3] ? (
                  <RowCenter>
                    <div>Unstaking...</div>
                    <div>
                      <LoadingSpinner height="20px" />
                    </div>
                  </RowCenter>
                ) : (
                  'Unstake'
                )}
              </Button>
              <Button onClick={handleClaimRewards}>
                {loading[2] && loading[3] ? (
                  <RowCenter>
                    <div>Claiming...</div>
                    <div>
                      <LoadingSpinner height="20px" />
                    </div>
                  </RowCenter>
                ) : (
                  'Claim reward'
                )}
              </Button>
            </GroupButton>
          ) : (
            <Button onClick={onClick}>
              {loading[0] && loading[3] ? (
                <RowCenter>
                  <div>Staking...</div>
                  <div>
                    <LoadingSpinner height="20px" />
                  </div>
                </RowCenter>
              ) : (
                'Stake'
              )}
            </Button>
          )}
        </CardContent>
      </Card>
    </Wrapper>
  )
}

export default StakeCard
