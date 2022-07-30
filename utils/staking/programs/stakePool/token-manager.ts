
import type { Wallet } from "@saberhq/solana-contrib";
import type { Connection, PublicKey, Transaction } from "@solana/web3.js";
import { tokenManagerAddressFromMint } from "utils/token-manager/programs/tokenManager/pda";
import { tokenManager } from "utils/token-manager/programs";
import { withRemainingAccountsForReturn } from "utils/token-manager/programs/tokenManager";

export const withInvalidate = async (
  transaction: Transaction,
  connection: Connection,
  wallet: Wallet,
  mintId: PublicKey
): Promise<Transaction> => {
  const tokenManagerId = await tokenManagerAddressFromMint(connection, mintId);

  const tokenManagerData = await tryGetAccount(() =>
    tokenManager.accounts.getTokenManager(connection, tokenManagerId)
  );

  if (!tokenManagerData) return transaction;

  const tokenManagerTokenAccountId = await withFindOrInitAssociatedTokenAccount(
    transaction,
    connection,
    mintId,
    tokenManagerId,
    wallet.publicKey,
    true
  );

  const remainingAccountsForReturn = await withRemainingAccountsForReturn(
    transaction,
    connection,
    wallet,
    tokenManagerData
  );

  transaction.add(
    await tokenManager.instruction.invalidate(
      connection,
      wallet,
      mintId,
      tokenManagerId,
      tokenManagerData.parsed.kind,
      tokenManagerData.parsed.state,
      tokenManagerTokenAccountId,
      tokenManagerData?.parsed.recipientTokenAccount,
      remainingAccountsForReturn
    )
  );
  return transaction;
};
