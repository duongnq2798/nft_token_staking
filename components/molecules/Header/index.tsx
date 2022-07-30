import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import Logo from 'components/atoms/Logo'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC } from 'react'

import { Wrapper, CenterMenu, MenuItem } from './styles'

const Header: FC = () => {
  const router = useRouter()
  return (
    <Wrapper>
      <Logo title="Sol@Stake" />
      <CenterMenu>
        <a onClick={() => router.push('/')}>
          <MenuItem>NFTs Staking</MenuItem>
        </a>
        <a onClick={() => router.push('/token-staking')}>
          <MenuItem>Token Staking </MenuItem>
        </a>
        <a onClick={() => router.push('/')}>
          <MenuItem>Raffle (soon)</MenuItem>
        </a>
      </CenterMenu>
      <WalletMultiButton />
    </Wrapper>
  )
}

export default Header
