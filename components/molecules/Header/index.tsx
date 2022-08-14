import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import Logo from 'components/atoms/Logo'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'

import { Wrapper, CenterMenu, MenuItem } from './styles'

const Header: FC = () => {
  const [path, setPath] = useState('/')
  const router = useRouter()

  useEffect(() => {
    setPath(router.pathname)
  }, [router])
  return (
    <Wrapper>
      <Logo title="Sol@Stake" />
      <CenterMenu>
        <a onClick={() => router.push('/')}>
          <MenuItem active={path === '/'}>NFTs Staking</MenuItem>
        </a>
        <a onClick={() => router.push('/token-staking')}>
          <MenuItem active={path === '/token-staking'}>Token Staking </MenuItem>
        </a>
      </CenterMenu>
      <WalletMultiButton />
    </Wrapper>
  )
}

export default Header
