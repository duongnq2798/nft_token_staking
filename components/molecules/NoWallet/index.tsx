import { useWallet } from '@solana/wallet-adapter-react'
import {
  useWalletModal,
  WalletMultiButton,
} from '@solana/wallet-adapter-react-ui'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  algin-items: center;
  padding: 24px;
  margin-top: 40px;
`

const Button = styled.button`
  background: linear-gradient(
    to right,
    rgb(236, 72, 153),
    rgb(239, 68, 68),
    rgb(234, 179, 8)
  );
  color: white;
  border-radius: 7px;
  padding: 12px 16px;
  cursor: pointer;
`

const Box = styled.div`
  display: flex;
  justify-content: center;
  algin-items: center;
  flex-direction: column;
`;

const Text = styled.p`
  color: ;white;
`

const NoWallet = () => {
  const wallet = useWallet()
  const modal = useWalletModal()

  return !wallet.publicKey ? (
    <Container>
      <Box>
        <Text>
          {`Note, this system is only for staking our collection/token test, if after you connect your wallet and don't see NFTs/FTs displayed this means you don't own them.`}
        </Text>
        <Button onClick={() => modal.setVisible(true)}>
          Connect wallet to staking your NFT
        </Button>
      </Box>
    </Container>
  ) : null
}

export default NoWallet
