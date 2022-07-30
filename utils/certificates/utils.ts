import * as web3 from "@solana/web3.js";
import * as splToken from "@solana/spl-token";
import * as anchor from "@project-serum/anchor";
import { IDL } from "./types/idl";

export const CERTIFICATE_IDL = IDL;
export const CERTIFICATE_PROGRAM_ID = new web3.PublicKey(
  "crt4Ymiqtk3M5w6JuKDT7GuZfUDiPLnhwRVqymSSBBn"
);
export const CERTIFICATE_SEED = "certificate";
export const MINT_MANAGER_SEED = "mint-manager";

export enum CertificateState {
  Issued = 1,
  Claimed = 2,
  Invalidated = 3,
}

export enum CertificateKind {
  Managed = 1,
  Unmanaged = 2,
}

export const PAYMENT_MINTS = [
  {
    mint: "So11111111111111111111111111111111111111112",
    symbol: "SOL",
  },
  {
    mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    symbol: "USDC",
  },
  {
    mint: "Saber2gLauYim4Mvftnrasomsv6NvAuncvMEZwcLpD1",
    symbol: "SBR",
  },
];

/**
 * Utility function for adding a find or init associated token account instruction to a transaction
 * Useful when using associated token accounts so you can be sure they are created before hand
 * @param transaction
 * @param connection
 * @param mint
 * @param owner
 * @param payer
 * @param allowOwnerOffCurve
 * @returns The associated token account ID that was found or will be created. This also adds the relevent instruction to create it to the transaction if not found
 */
export async function withFindOrInitAssociatedTokenAccount(
  transaction: web3.Transaction,
  connection: web3.Connection,
  mint: web3.PublicKey,
  owner: web3.PublicKey,
  payer: web3.PublicKey,
  allowOwnerOffCurve?: boolean
): Promise<web3.PublicKey> {
  const associatedAddress = await splToken.Token.getAssociatedTokenAddress(
    splToken.ASSOCIATED_TOKEN_PROGRAM_ID,
    splToken.TOKEN_PROGRAM_ID,
    mint,
    owner,
    allowOwnerOffCurve
  );
  const account = await connection.getAccountInfo(associatedAddress);
  if (!account) {
    transaction.add(
      splToken.Token.createAssociatedTokenAccountInstruction(
        splToken.ASSOCIATED_TOKEN_PROGRAM_ID,
        splToken.TOKEN_PROGRAM_ID,
        mint,
        associatedAddress,
        owner,
        payer
      )
    );
  }
  return associatedAddress;
}

/**
 * Utility for deriving certificateId given a Mint public key
 * @param mint Token mint public key
 * @returns Certificate public key
 */
export async function certificateIdForMint(
  mint: web3.PublicKey
): Promise<[web3.PublicKey, number]> {
  return await web3.PublicKey.findProgramAddress(
    [anchor.utils.bytes.utf8.encode(CERTIFICATE_SEED), mint.toBuffer()],
    CERTIFICATE_PROGRAM_ID
  );
}
