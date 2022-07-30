import type { AccountData, EntryData } from 'utils/namespaces'
import * as namespaces from 'utils/namespaces'
import type { Wallet } from '@saberhq/solana-contrib'
import * as web3 from '@solana/web3.js'

import { signAndSendTransaction } from './transactions'

export function apiBase(dev?: boolean): string {
  return `https://${dev ? 'dev-api' : 'api'}.cardinal.so`
}

export async function tryGetNameEntry(
  connection: web3.Connection,
  namespaceName: string,
  entryName: string
): Promise<AccountData<EntryData> | null> {
  try {
    const entry = await namespaces.getNameEntry(
      connection,
      namespaceName,
      entryName
    )
    return entry
  } catch (e) {
    return null
  }
}

export async function revokeAndClaim(
  cluster: string,
  connection: web3.Connection,
  wallet: Wallet,
  namespaceName: string,
  entryName: string,
  duration: number | null,
  reverseEntryId: web3.PublicKey,
  claimRequestId: web3.PublicKey,
  certificateMintId: web3.PublicKey,
  certificateOwnerId: web3.PublicKey
): Promise<string> {
  const entry = await tryGetNameEntry(connection, namespaceName, entryName)
  const transaction = new web3.Transaction()
  if (!entry?.parsed.reverseEntry) {
    await namespaces.withRevokeReverseEntry(
      connection,
      wallet,
      namespaceName,
      entryName,
      reverseEntryId,
      claimRequestId,
      transaction
    )
  }
  await namespaces.withRevokeEntry(
    connection,
    wallet,
    namespaceName,
    entryName,
    certificateMintId,
    certificateOwnerId,
    claimRequestId,
    transaction
  )
  transaction.feePayer = wallet.publicKey
  transaction.recentBlockhash = (
    await connection.getRecentBlockhash('max')
  ).blockhash
  await wallet.signTransaction(transaction)
  const txid = await web3.sendAndConfirmRawTransaction(
    connection,
    transaction.serialize()
  )

  const transaction2 = new web3.Transaction()
  await namespaces.withClaimEntry(
    connection,
    wallet,
    namespaceName,
    entryName,
    certificateMintId,
    duration || 0,
    transaction2
  )
  await namespaces.withSetReverseEntry(
    connection,
    wallet,
    namespaceName,
    entryName,
    certificateMintId,
    transaction2
  )
  transaction2.feePayer = wallet.publicKey
  transaction2.recentBlockhash = (
    await connection.getRecentBlockhash('max')
  ).blockhash
  await wallet.signTransaction(transaction2)
  return web3.sendAndConfirmRawTransaction(connection, transaction2.serialize())
}

export async function setReverseEntry(
  connection: web3.Connection,
  wallet: Wallet,
  namespaceName: string,
  entryName: string,
  certificateMintId: web3.PublicKey
): Promise<string> {
  const transaction = await namespaces.withSetReverseEntry(
    connection,
    wallet,
    namespaceName,
    entryName,
    certificateMintId,
    new web3.Transaction()
  )
  transaction.feePayer = wallet.publicKey
  transaction.recentBlockhash = (
    await connection.getRecentBlockhash('max')
  ).blockhash
  await wallet.signTransaction(transaction)
  let txid = null
  txid = await web3.sendAndConfirmRawTransaction(
    connection,
    transaction.serialize()
  )
  return txid
}

export async function initAndClaimEntry(
  cluster: string,
  connection: web3.Connection,
  wallet: Wallet,
  namespaceName: string,
  entryName: string,
  duration: number | null
): Promise<string> {
  const certificateMint = web3.Keypair.generate()
  const transaction = new web3.Transaction()
  await namespaces.withInitEntry(
    connection,
    wallet,
    certificateMint.publicKey,
    namespaceName,
    entryName,
    transaction
  )
  await namespaces.withClaimEntry(
    connection,
    wallet,
    namespaceName,
    entryName,
    certificateMint.publicKey,
    duration || 0,
    transaction
  )
  await namespaces.withSetReverseEntry(
    connection,
    wallet,
    namespaceName,
    entryName,
    certificateMint.publicKey,
    transaction
  )
  transaction.feePayer = wallet.publicKey
  transaction.recentBlockhash = (
    await connection.getRecentBlockhash('max')
  ).blockhash
  await wallet.signTransaction(transaction)
  await transaction.partialSign(certificateMint)
  return web3.sendAndConfirmRawTransaction(connection, transaction.serialize())
}

export async function claimEntry(
  connection: web3.Connection,
  wallet: Wallet,
  namespaceName: string,
  entryName: string,
  certificateMintId: web3.PublicKey,
  duration: number | null
): Promise<string> {
  const transaction = await namespaces.withClaimEntry(
    connection,
    wallet,
    namespaceName,
    entryName,
    certificateMintId,
    duration || 0,
    new web3.Transaction()
  )
  await namespaces.withSetReverseEntry(
    connection,
    wallet,
    namespaceName,
    entryName,
    certificateMintId,
    transaction
  )
  transaction.feePayer = wallet.publicKey
  transaction.recentBlockhash = (
    await connection.getRecentBlockhash('max')
  ).blockhash
  await wallet.signTransaction(transaction)
  let txid = null
  txid = await web3.sendAndConfirmRawTransaction(
    connection,
    transaction.serialize()
  )
  return txid
}

export async function setEntryData(
  connection: web3.Connection,
  wallet: Wallet,
  namespaceName: string,
  entryName: string,
  entryData: string
): Promise<string> {
  const transaction = await namespaces.withSetEntryData(
    connection,
    wallet,
    namespaceName,
    entryName,
    new web3.PublicKey(entryData),
    new web3.Transaction()
  )
  transaction.feePayer = wallet.publicKey
  transaction.recentBlockhash = (
    await connection.getRecentBlockhash('max')
  ).blockhash
  await wallet.signTransaction(transaction)
  let txid = null
  txid = await web3.sendAndConfirmRawTransaction(
    connection,
    transaction.serialize()
  )
  return txid
}

export async function approveClaimRequest(
  connection: web3.Connection,
  wallet: Wallet,
  namespaceName: string,
  claimRequestId: web3.PublicKey
): Promise<string> {
  const transaction = await namespaces.withUpdateClaimRequest(
    connection,
    wallet,
    namespaceName,
    claimRequestId,
    true,
    new web3.Transaction()
  )
  transaction.feePayer = wallet.publicKey
  transaction.recentBlockhash = (
    await connection.getRecentBlockhash('max')
  ).blockhash
  await wallet.signTransaction(transaction)
  let txid = null
  txid = await web3.sendAndConfirmRawTransaction(
    connection,
    transaction.serialize()
  )
  return txid
}

export async function getPendingClaimRequests(connection: web3.Connection) {
  return namespaces.getPendingClaimRequests(connection)
}

export async function createClaimRequest(
  connection: web3.Connection,
  wallet: Wallet,
  namespaceName: string,
  entryName: string
): Promise<string> {
  return await signAndSendTransaction(
    connection,
    wallet,
    await namespaces.withCreateClaimRequest(
      connection,
      wallet,
      namespaceName,
      entryName,
      wallet.publicKey,
      new web3.Transaction()
    )
  )
}
