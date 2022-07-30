import { LoadingSpinner } from 'common/LoadingSpinner'
import { AllowedTokenData } from 'hooks/useAllowedTokenDatas'
import { StakeEntryTokenData } from 'hooks/useStakedTokenDatas'
import { FC, useState } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Card = styled.div`
  width: 35%;
  background: #000000;
  border-radius: 16px;
  padding: 24px;

  @media screen and (max-width: 668px) {
    width: 100%;
  }
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 16px;
`

const Photo = styled.img`
  width: 90px;
  height: 90px;
  border-radius: 50%;
`

const TokenName = styled.h2`
  display: block;
  width: 100%;
`

const RowBetween = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
`

const RowCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`

const Label = styled.p`
  font-size: 18px;
  color: #ffffff90;
  line-height: 140%;
  display: contents;
`

const Value = styled.p`
  font-size: 18px;
`

const InputAmount = styled.input`
  background: #1a1b20;
  padding: 8px 16px;
  border-radius: 8px;
  outline: none;
  border: 0;

  &:focus {
    outline: none;
    border: 0;
  }
`

const Button = styled.button`
  color: #ffffff;
  padding: 0.8rem;
  font-size: 14px;
  text-transform: uppercase;
  border-radius: 4px;
  font-weight: 400;
  display: block;
  width: 100%;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: linear-gradient(
    to right,
    rgb(236, 72, 153),
    rgb(239, 68, 68),
    rgb(234, 179, 8)
  );
  margin-top: 16px;
  transition: 0.2s;

  :hover {
    opacity: 0.9;
  }
`

const Tab = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
`

const TabItem: any = styled.div`
  color: #ffffff;
  pointer-events: ${(props: any) => (props.disabled ? 'none' : '')};
  opacity: ${(props: any) => (props.disabled ? '0.6' : '1')};
  background: ${(props: any) =>
    props.active
      ? 'linear-gradient(to right, rgb(236, 72, 153), rgb(239, 68, 68), rgb(234, 179, 8))'
      : '#FFFFFF20'};
  padding: 4px 8px;
  border-radius: 8px;
  cursor: pointer;
`

const Tabs = [
  {
    id: 1,
    name: 'Stake',
  },
  {
    id: 2,
    name: 'Unstake',
  },
  {
    id: 3,
    name: 'Claim rewards',
  },
]
interface Props {
  ntk: AllowedTokenData
  stk: StakeEntryTokenData
  balance: string
  amountToClaim: string
  loadingStake: boolean
  loadingUnStake: boolean
  loadingClaim: boolean
  selectUnstakedToken: (tk: AllowedTokenData, targetValue?: string) => void
  handleStake: () => void
  handleUnstake: (tk: StakeEntryTokenData) => void
  handleClaimRewards: (tk: any) => void
}

const TokenCard: FC<Props> = ({
  ntk,
  stk,
  balance,
  amountToClaim,
  loadingStake,
  loadingUnStake,
  loadingClaim,
  selectUnstakedToken,
  handleStake,
  handleUnstake,
  handleClaimRewards,
}) => {
  const [currentTab, setCurrentTab] = useState(1)
  const [amount, setAmount] = useState('')

  const getActionButton = () => {
    switch (currentTab) {
      case 1:
        return (
          <Button onClick={() => amount ? handleStake() : null}>
            {loadingStake ? (
              <RowCenter>
                <div>Staking token...</div>
                <div>
                  <LoadingSpinner height="20px" />
                </div>
              </RowCenter>
            ) : (
              'Stake'
            )}
          </Button>
        )
      case 2:
        return (
          <Button
            onClick={() => {
              handleUnstake(stk)
            }}
          >
            {loadingUnStake ? (
              <RowCenter>
                <div>Unstaking token...</div>
                <div>
                  <LoadingSpinner height="20px" />
                </div>
              </RowCenter>
            ) : (
              'Unstake'
            )}
          </Button>
        )
      case 3:
        return (
          <Button
            onClick={() => {
              handleClaimRewards(stk)
            }}
          >
            {loadingClaim ? (
              <RowCenter>
                <div>Claiming token...</div>
                <div>
                  <LoadingSpinner height="20px" />
                </div>
              </RowCenter>
            ) : (
              'Claim reward'
            )}
          </Button>
        )
    }
  }
  const getText = () => {
    switch (currentTab) {
      case 1:
        return 'Amount to stake'
      case 2:
        return 'Claimable reward'
      case 3:
        return 'Claimable reward'
    }
  }
  const getInput = () => {
    switch (currentTab) {
      case 1:
        return (
          <InputAmount
            type="number"
            placeholder={'Enter Amount'}
            onChange={(e) => {
              selectUnstakedToken(ntk, e.target.value)
              setAmount(e.target.value)
            }}
          />
        )
      case 2:
        return <p>{amountToClaim}</p>
      case 3:
        return <p>{amountToClaim}</p>
    }
  }

  return (
    <Wrapper>
      <Card>
        <Tab>
          {Tabs.map((tab) => {
            return (
              <TabItem
                key={tab.id}
                onClick={() => setCurrentTab(tab.id)}
                disabled={false}
                active={currentTab === tab.id}
              >
                {tab.name}
              </TabItem>
            )
          })}
        </Tab>
        <Header>
          <Photo
            src={ntk.metadata?.data.image || ntk.tokenListData?.logoURI}
            alt={ntk.metadata?.data.name || ntk.tokenListData?.name}
          />
          <TokenName>
            {ntk.metadata?.data.name || ntk.tokenListData?.symbol}
          </TokenName>
        </Header>
        <RowBetween>
          <Label>Balance :</Label>
          <Value>{balance ? balance : '---'}</Value>
        </RowBetween>
        <RowBetween>
          <Label>{getText()} : </Label>
          {getInput()}
        </RowBetween>

        {getActionButton()}
      </Card>
    </Wrapper>
  )
}

export default TokenCard
