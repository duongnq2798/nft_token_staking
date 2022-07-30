import type { web3 } from '@project-serum/anchor'
import type { Wallet } from '@saberhq/solana-contrib'
import type { Cluster } from '@solana/web3.js'

import { Button } from '../common/Button'
import { TwitterIcon } from '../common/TwitterIcon'
import { useWalletIdentity } from '../providers/WalletIdentityProvider'

interface Props
  extends Omit<
    React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    'onClick'
  > {
  cluster: Cluster
  connection: web3.Connection
  secondaryConnection?: web3.Connection
  wallet: Wallet
  address: web3.PublicKey
  disabled?: boolean
  dev?: boolean
  variant?: 'primary' | 'secondary'
}

export const ConnectTwitterButton: React.FC<Props> = ({
  variant = 'primary',
  dev,
  cluster,
  connection,
  secondaryConnection,
  wallet,
  address,
  disabled,
  ...buttonProps
}: Props) => {
  const { show } = useWalletIdentity()
  return (
    <Button
      variant={variant}
      disabled={disabled}
      {...buttonProps}
      onClick={() =>
        !disabled && show(wallet, connection, cluster, secondaryConnection, dev)
      }
    >
      <div style={{ height: '14px', width: '20px' }}>
        <TwitterIcon disabled={disabled} height={14} width={20} />
      </div>
      <span>Link Profile</span>
    </Button>
  )
}
