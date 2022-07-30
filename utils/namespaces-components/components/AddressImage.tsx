import type { Connection, PublicKey } from '@solana/web3.js'
import ContentLoader from 'react-content-loader'
import { HiUserCircle } from 'react-icons/hi'

import { useAddressImage } from '../hooks/useAddressImage'

export const AddressImage = ({
  connection,
  address,
  style,
  height = '150px',
  width = '150px',
  dark = false,
  placeholder,
}: {
  connection: Connection
  address: PublicKey | undefined
  height?: string
  width?: string
  dark?: boolean
  placeholder?: React.ReactNode
  style?: React.CSSProperties
}) => {
  const { addressImage, loadingImage } = useAddressImage(connection, address)

  if (!address) return <></>
  return loadingImage ? (
    <div
      style={{
        ...style,
        height,
        width,
        borderRadius: '50%',
        overflow: 'hidden',
      }}
    >
      <ContentLoader
        backgroundColor={dark ? '#333' : undefined}
        foregroundColor={dark ? '#555' : undefined}
      >
        <rect
          x="0"
          y="0"
          rx={width}
          ry={height}
          width={width}
          height={height}
        />
      </ContentLoader>
    </div>
  ) : addressImage ? (
    <img
      style={{
        ...style,
        height: height,
        width: width,
        borderRadius: '50%',
      }}
      alt={`profile-${address.toString()}`}
      src={addressImage}
    ></img>
  ) : (
    <>{placeholder}</> || (
      <HiUserCircle style={{ width, height }} className="text-gray-300" />
    )
  )
}
