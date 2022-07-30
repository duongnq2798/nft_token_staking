import type { Wallet } from "@saberhq/solana-contrib";
import * as splToken from "@solana/spl-token";
import type {
  Connection,
  Keypair,
  PublicKey,
  Transaction,
} from "@solana/web3.js";
import { SystemProgram } from "@solana/web3.js";

import { withFindOrInitAssociatedTokenAccount } from "./transactions";

export const withCreateMint = async (
  transaction: Transaction,
  connection: Connection,
  wallet: Wallet,
  recipient: PublicKey,
  mintId: PublicKey,
  amount = 1,
  freezeAuthority: PublicKey = recipient
): Promise<[PublicKey, Transaction]> => {
  const mintBalanceNeeded = await splToken.Token.getMinBalanceRentForExemptMint(
    connection
  );
  transaction.add(
    SystemProgram.createAccount({
      fromPubkey: wallet.publicKey,
      newAccountPubkey: mintId,
      lamports: mintBalanceNeeded,
      space: splToken.MintLayout.span,
      programId: splToken.TOKEN_PROGRAM_ID,
    })
  );
  transaction.add(
    splToken.Token.createInitMintInstruction(
      splToken.TOKEN_PROGRAM_ID,
      mintId,
      0,
      wallet.publicKey,
      freezeAuthority
    )
  );
  const walletAta = await withFindOrInitAssociatedTokenAccount(
    transaction,
    connection,
    mintId,
    wallet.publicKey,
    wallet.publicKey
  );
  if (amount > 0) {
    transaction.add(
      splToken.Token.createMintToInstruction(
        splToken.TOKEN_PROGRAM_ID,
        mintId,
        walletAta,
        wallet.publicKey,
        [],
        amount
      )
    );
  }
  return [walletAta, transaction];
};

/**
 * Creates mint, token account, and mints amount to token account
 * @param connection
 * @param creator
 * @returns
 */
export const createMint = async (
  connection: Connection,
  creator: Keypair,
  recipient: PublicKey,
  amount = 1,
  freezeAuthority: PublicKey = recipient
): Promise<[PublicKey, splToken.Token]> => {
  const mint = await splToken.Token.createMint(
    connection,
    creator,
    creator.publicKey,
    freezeAuthority,
    0,
    splToken.TOKEN_PROGRAM_ID
  );
  const tokenAccount = await mint.createAssociatedTokenAccount(recipient);
  await mint.mintTo(tokenAccount, creator.publicKey, [], amount);
  return [tokenAccount, mint];
};
