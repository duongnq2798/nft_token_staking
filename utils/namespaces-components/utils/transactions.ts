import { web3 } from "@project-serum/anchor";
import type { Wallet } from "@saberhq/solana-contrib";

export const signAndSendTransaction = async (
  connection: web3.Connection,
  wallet: Wallet | null,
  transaction: web3.Transaction
) => {
  if (!wallet) throw new Error("Wallet not connected");
  transaction.feePayer = wallet.publicKey;
  transaction.recentBlockhash = (
    await connection.getRecentBlockhash("max")
  ).blockhash;
  await wallet.signTransaction(transaction);
  let txid = null;
  txid = await web3.sendAndConfirmRawTransaction(
    connection,
    transaction.serialize()
  );
  return txid;
};

export const withSleep = async (fn: () => void, sleep = 2000) => {
  await new Promise((r) => setTimeout(r, sleep));
  await fn();
};
