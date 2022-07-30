import type { Connection, PublicKey } from '@solana/web3.js'
import { useMemo, useState } from 'react'
import { tryGetName } from 'utils/namespaces';

import { useWalletIdentity } from '../providers/WalletIdentityProvider'

export const useAddressName = (
  connection: Connection,
  address: PublicKey | undefined
): { displayName: string | undefined; loadingName: boolean } => {
  const { handle } = useWalletIdentity()
  const [displayName, setDisplayName] = useState<string | undefined>()
  const [loadingName, setLoadingName] = useState<boolean>(true)

  const refreshName = async () => {
    try {
      setLoadingName(true)
      if (address) {
        const n = await tryGetName(connection, address)
        setDisplayName(n)
      }
    } finally {
      setLoadingName(false)
    }
  }

  useMemo(() => {
    void refreshName()
  }, [connection, address?.toString(), handle])

  return { displayName, loadingName }
}
