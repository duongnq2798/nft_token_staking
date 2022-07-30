import { FC } from 'react'
import { Wrapper, Column, Label, Content } from './styles'

interface Props {
  totalStaked: string
  maxStaked?: number;
  percentStaked?: number; 
  rewardRate?: string;
  earning: string;
}

const Stats: FC<Props> = ({ totalStaked, maxStaked = 0, percentStaked = 0, rewardRate, earning = ''}) => {
  return (
    <Wrapper>
      <Column>
        <Label>Total Staked:</Label>
        <Content>
          {Number(totalStaked).toLocaleString()}
          {maxStaked ? `/ ${maxStaked.toLocaleString()}` : ''}
        </Content>
      </Column>
      <Column>
        <Label>Percent Staked: </Label>
        <Content>{maxStaked > 0 && percentStaked ?
                      Math.floor(
                        ((percentStaked * 100) / maxStaked ?? 0) *
                          10000
                      ) / 10000 : ' --- '}
                    %</Content>
      </Column>
      <Column>
        <Label>Rewards Rate: </Label>
        <Content>{rewardRate} / Day</Content>
      </Column>
      <Column>
        <Label>Earning: </Label>
        <Content>{earning}</Content>
      </Column>
    </Wrapper>
  )
}

export default Stats
