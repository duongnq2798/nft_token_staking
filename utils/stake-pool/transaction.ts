import type { Wallet } from "@saberhq/solana-contrib";
import * as anchor from "@project-serum/anchor";
import * as web3 from "@solana/web3.js";
import * as splToken from "@solana/spl-token";
import * as metaplex from "@metaplex-foundation/mpl-token-metadata";
import * as certificate from "utils/certificates";
import { withFindOrInitAssociatedTokenAccount } from "./index";
import {
  STAKE_POOL_PROGRAM,
  STAKE_ENTRY_SEED,
  STAKE_POOL_PROGRAM_ID,
  GROUP_ENTRY_SEED,
  STAKE_POOL_IDL,
  CRANK_PUB_KEY,
} from "./constants";
import { Program } from "@project-serum/anchor";

export async function withInitStakeEntry(
  connection: web3.Connection,
  wallet: Wallet,
  transaction: web3.Transaction,
  params: {
    originalMint: web3.PublicKey;
    certificateMint: web3.PublicKey;
    name: string;
    symbol: string;
    tribe: string;
    hungry: boolean;
  }
): Promise<web3.Transaction> {
  const provider = new anchor.AnchorProvider(connection, wallet, {});
  const stakePool = new anchor.Program<STAKE_POOL_PROGRAM>(
    STAKE_POOL_IDL,
    STAKE_POOL_PROGRAM_ID,
    provider
  );

  const [stakeEntryId, bump] = await web3.PublicKey.findProgramAddress(
    [
      anchor.utils.bytes.utf8.encode(STAKE_ENTRY_SEED),
      params.originalMint.toBytes(),
    ],
    stakePool.programId
  );

  const [mintManagerId, mintManagerBump] =
    await web3.PublicKey.findProgramAddress(
      [
        anchor.utils.bytes.utf8.encode(certificate.MINT_MANAGER_SEED),
        params.certificateMint.toBytes(),
      ],
      certificate.CERTIFICATE_PROGRAM_ID
    );

  const certificateMintTokenAccount =
    await splToken.Token.getAssociatedTokenAddress(
      splToken.ASSOCIATED_TOKEN_PROGRAM_ID,
      splToken.TOKEN_PROGRAM_ID,
      params.certificateMint,
      stakeEntryId,
      true
    );

  const [certificateMintMetadataId] = await web3.PublicKey.findProgramAddress(
    [
      Buffer.from(metaplex.MetadataProgram.PREFIX),
      metaplex.MetadataProgram.PUBKEY.toBuffer(),
      params.certificateMint.toBuffer(),
    ],
    metaplex.MetadataProgram.PUBKEY
  );

  const mintBalanceNeeded = await splToken.Token.getMinBalanceRentForExemptMint(
    provider.connection
  );

  transaction.add(
    web3.SystemProgram.createAccount({
      fromPubkey: wallet.publicKey,
      newAccountPubkey: params.certificateMint,
      lamports: mintBalanceNeeded,
      space: splToken.MintLayout.span,
      programId: splToken.TOKEN_PROGRAM_ID,
    })
  );

  transaction.add(
    stakePool.instruction.initEntry(
      {
        bump,
        mintManagerBump,
        name: params.name,
        symbol: params.symbol,
        tribe: params.tribe,
        hungry: params.hungry,
      },
      {
        accounts: {
          stakeEntry: stakeEntryId,
          originalMint: params.originalMint,
          payer: wallet.publicKey,
          certificateMint: params.certificateMint,
          certificateMintTokenAccount: certificateMintTokenAccount,
          certifiacteMintMetadata: certificateMintMetadataId,
          mintManager: mintManagerId,

          // programs
          certificateProgram: certificate.CERTIFICATE_PROGRAM_ID,
          tokenMetadataProgram: metaplex.MetadataProgram.PUBKEY,
          tokenProgram: splToken.TOKEN_PROGRAM_ID,
          associatedToken: splToken.ASSOCIATED_TOKEN_PROGRAM_ID,
          rent: web3.SYSVAR_RENT_PUBKEY,
          systemProgram: anchor.web3.SystemProgram.programId,
        },
      }
    )
  );

  return transaction;
}

export async function withStake(
  connection: web3.Connection,
  wallet: Wallet,
  transaction: web3.Transaction,
  params: {
    originalMint: web3.PublicKey;
    certificateMint: web3.PublicKey;
    userOriginalMintTokenAccountId: web3.PublicKey;
    userCertificateMintTokenAccountId: web3.PublicKey;
  }
): Promise<web3.Transaction> {
  const provider = new anchor.AnchorProvider(connection, wallet, {});
  const stakePool = new anchor.Program<STAKE_POOL_PROGRAM>(
    STAKE_POOL_IDL,
    STAKE_POOL_PROGRAM_ID,
    provider
  );

  const [stakeEntryId] = await web3.PublicKey.findProgramAddress(
    [
      anchor.utils.bytes.utf8.encode(STAKE_ENTRY_SEED),
      params.originalMint.toBytes(),
    ],
    stakePool.programId
  );

  const stakeEntryOriginalMintTokenAccountId =
    await withFindOrInitAssociatedTokenAccount(
      transaction,
      provider.connection,
      params.originalMint,
      stakeEntryId,
      wallet.publicKey,
      true
    );

  const stakeEntryCertificateMintTokenAccountId =
    await withFindOrInitAssociatedTokenAccount(
      transaction,
      provider.connection,
      params.certificateMint,
      stakeEntryId,
      wallet.publicKey,
      true
    );

  const [certificateId, certificateBump] =
    await web3.PublicKey.findProgramAddress(
      [
        anchor.utils.bytes.utf8.encode("certificate"),
        params.certificateMint.toBytes(),
      ],
      certificate.CERTIFICATE_PROGRAM_ID
    );

  const certificateTokenAccountId = await withFindOrInitAssociatedTokenAccount(
    transaction,
    provider.connection,
    params.certificateMint,
    certificateId,
    wallet.publicKey,
    true
  );

  const [mintManagerId] = await web3.PublicKey.findProgramAddress(
    [
      anchor.utils.bytes.utf8.encode("mint-manager"),
      params.certificateMint.toBytes(),
    ],
    certificate.CERTIFICATE_PROGRAM_ID
  );

  transaction.add(
    stakePool.instruction.stake(
      {
        certificateBump,
      },
      {
        accounts: {
          stakeEntry: stakeEntryId,
          originalMint: params.originalMint,
          certificateMint: params.certificateMint,
          // sake entry
          stakeEntryOriginalMintTokenAccount:
            stakeEntryOriginalMintTokenAccountId,
          stakeEntryCertificateMintTokenAccount:
            stakeEntryCertificateMintTokenAccountId,
          // user
          user: wallet.publicKey,
          userOriginalMintTokenAccount: params.userOriginalMintTokenAccountId,
          userCertificateMintTokenAccount:
            params.userCertificateMintTokenAccountId,
          // cpi
          certificateProgram: certificate.CERTIFICATE_PROGRAM_ID,
          certificate: certificateId,
          mintManager: mintManagerId,
          certificateTokenAccount: certificateTokenAccountId,

          // programs
          associatedToken: splToken.ASSOCIATED_TOKEN_PROGRAM_ID,
          tokenProgram: splToken.TOKEN_PROGRAM_ID,
          rent: web3.SYSVAR_RENT_PUBKEY,
          systemProgram: anchor.web3.SystemProgram.programId,
        },
      }
    )
  );

  return transaction;
}

export async function withUnstake(
  connection: web3.Connection,
  wallet: Wallet,
  transaction: web3.Transaction,
  params: {
    originalMint: web3.PublicKey;
    certificateMint: web3.PublicKey;
    userOriginalMintTokenAccountId: web3.PublicKey;
    userCertificateMintTokenAccountId: web3.PublicKey;
  }
): Promise<web3.Transaction> {
  const provider = new anchor.AnchorProvider(connection, wallet, {});
  const stakePool = new anchor.Program<STAKE_POOL_PROGRAM>(
    STAKE_POOL_IDL,
    STAKE_POOL_PROGRAM_ID,
    provider
  );

  const [stakeEntryId] = await web3.PublicKey.findProgramAddress(
    [
      anchor.utils.bytes.utf8.encode(STAKE_ENTRY_SEED),
      params.originalMint.toBytes(),
    ],
    stakePool.programId
  );

  const stakeEntryAccount = await stakePool.account.stakeEntry.fetch(
    stakeEntryId
  );
  const certificateMintId = stakeEntryAccount.certificateMint;
  const originalMintId = stakeEntryAccount.originalMint;

  const stakeEntryOriginalMintTokenAccountId =
    await withFindOrInitAssociatedTokenAccount(
      transaction,
      provider.connection,
      originalMintId,
      stakeEntryId,
      wallet.publicKey,
      true
    );

  const stakeEntryCertificateMintTokenAccountId =
    await withFindOrInitAssociatedTokenAccount(
      transaction,
      provider.connection,
      certificateMintId,
      stakeEntryId,
      wallet.publicKey,
      true
    );

  // revoke certificate
  await certificate.withRevokeCertificateV2(connection, wallet, transaction, {
    certificateMint: params.certificateMint,
    revokeRecipient: CRANK_PUB_KEY,
  });

  transaction.add(
    stakePool.instruction.unstake({
      accounts: {
        stakeEntry: stakeEntryId,
        originalMint: originalMintId,
        certificateMint: certificateMintId,
        // sake entry
        stakeEntryOriginalMintTokenAccount:
          stakeEntryOriginalMintTokenAccountId,
        stakeEntryCertificateMintTokenAccount:
          stakeEntryCertificateMintTokenAccountId,
        // user
        user: wallet.publicKey,
        userOriginalMintTokenAccount: params.userOriginalMintTokenAccountId,
        userCertificateMintTokenAccount:
          params.userCertificateMintTokenAccountId,
        // programs
        tokenProgram: splToken.TOKEN_PROGRAM_ID,
      },
    })
  );

  return transaction;
}

export async function withGroup(
  connection: web3.Connection,
  wallet: Wallet,
  transaction: web3.Transaction,
  params: {
    stakeEntryOne: anchor.web3.PublicKey;
    stakeEntryTwo: anchor.web3.PublicKey;
    stakeEntryThree: anchor.web3.PublicKey;
    stakeEntryFour: anchor.web3.PublicKey;
    staker: anchor.web3.PublicKey;
  }
): Promise<web3.Transaction> {
  const provider = new anchor.AnchorProvider(connection, wallet, {});
  const stakePoolProgram = new Program<STAKE_POOL_PROGRAM>(
    STAKE_POOL_IDL,
    STAKE_POOL_PROGRAM_ID,
    provider
  );

  const [groupStakeEntryId, bump] = await web3.PublicKey.findProgramAddress(
    [
      anchor.utils.bytes.utf8.encode(GROUP_ENTRY_SEED),
      params.stakeEntryOne.toBytes(),
      params.stakeEntryTwo.toBytes(),
      params.stakeEntryThree.toBytes(),
      params.stakeEntryFour.toBytes(),
    ],
    stakePoolProgram.programId
  );

  transaction.add(
    stakePoolProgram.instruction.group(
      {
        bump: bump,
      },
      {
        accounts: {
          groupEntry: groupStakeEntryId,
          stakeEntryOne: params.stakeEntryOne,
          stakeEntryTwo: params.stakeEntryTwo,
          stakeEntryThree: params.stakeEntryThree,
          stakeEntryFour: params.stakeEntryFour,
          staker: wallet.publicKey,
          payer: wallet.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
        },
      }
    )
  );

  return transaction;
}

export async function withUngroup(
  connection: web3.Connection,
  wallet: Wallet,
  transaction: web3.Transaction,
  params: {
    groupStakeEntryId: web3.PublicKey;
    stakeEntryOne: web3.PublicKey;
    stakeEntryTwo: web3.PublicKey;
    stakeEntryThree: web3.PublicKey;
    stakeEntryFour: web3.PublicKey;
  }
): Promise<web3.Transaction> {
  const provider = new anchor.AnchorProvider(connection, wallet, {});
  const stakePoolProgram = new Program<STAKE_POOL_PROGRAM>(
    STAKE_POOL_IDL,
    STAKE_POOL_PROGRAM_ID,
    provider
  );

  transaction.add(
    stakePoolProgram.instruction.ungroup({
      accounts: {
        groupEntry: params.groupStakeEntryId,
        stakeEntryOne: params.stakeEntryOne,
        stakeEntryTwo: params.stakeEntryTwo,
        stakeEntryThree: params.stakeEntryThree,
        stakeEntryFour: params.stakeEntryFour,
        authority: wallet.publicKey,
      },
    })
  );

  return transaction;
}
