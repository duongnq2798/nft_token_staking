import type { Connection, PublicKey } from '@solana/web3.js'
import { HiUserCircle } from 'react-icons/hi'

import { shortPubKey } from '../utils/format'
import { AddressImage } from './AddressImage'
import { DisplayAddress } from './DisplayAddress'

export const ProfileSmall = ({
  connection,
  address,
  dark,
  onClick,
  placeholder,
  className,
  style,
}: {
  /** Solana RPC Connection to load this profile  */
  connection: Connection
  /** Address for which this profile is for */
  address: PublicKey | undefined
  /** Boolean for whether this should load dark or light loading bars */
  dark?: boolean
  /** onClick handler for clicking this profile */
  onClick?: () => void
  /** Placeholder for showing while the avatar is loading */
  placeholder?: React.ReactNode
  /** Optional class name to add to the profile div */
  className?: string
  /** Optional style prop to add to the profile div */
  style?: React.CSSProperties
}) => {
  return (
    <div
      className={`${className} flex cursor-pointer gap-2 text-sm`}
      style={style}
      onClick={onClick}
    >
      <AddressImage
        connection={connection}
        address={address || undefined}
        height="40px"
        width="40px"
        dark={dark}
        placeholder={
          placeholder || (
            <div
              style={{
                color: 'rgb(209, 213, 219)',
                cursor: 'pointer',
                overflow: 'hidden',
                height: '40px',
                width: '40px',
              }}
            >
              <HiUserCircle
                style={{
                  position: 'relative',
                  height: '50px',
                  width: '50px',
                  left: '-5px',
                  top: '-5px',
                }}
                className="relative left-[-5px] top-[-5px] h-[50px] w-[50px]"
              />
            </div>
          )
        }
      />
      <div>
        <div className={`text-${dark ? 'white' : 'black'}`}>
          <DisplayAddress
            style={{ pointerEvents: 'none' }}
            connection={connection}
            address={address || undefined}
            height="20px"
            width="100px"
            dark={dark}
          />
        </div>
        <div className="text-sm text-gray-500">{shortPubKey(address)}</div>
      </div>
    </div>
  )
}
