import * as anchor from "@project-serum/anchor";
import * as certificate from "utils/certificates";
import * as web3 from "@solana/web3.js";
import * as splToken from "@solana/spl-token";
import * as mplTokenMetadata from "@metaplex-foundation/mpl-token-metadata";
import { Wallet } from "@saberhq/solana-contrib";
import { Namespaces } from "./types/idl";
import {
  CERTIFICATE_PROGRAM_ID,
  CERTIFICATE_SEED,
  MINT_MANAGER_SEED,
  withFindOrInitAssociatedTokenAccount,
} from "utils/certificates";
import {
  NAMESPACES_PROGRAM_ID,
  NAMESPACES_IDL,
  ENTRY_SEED,
  REVERSE_ENTRY_SEED,
  GLOBAL_CONTEXT_SEED,
  NAMESPACE_SEED,
  CLAIM_REQUEST_SEED,
} from "./utils";

export async function withInit(
  connection: web3.Connection,
  wallet: Wallet,
  rentalPercentage: number,
  transaction: web3.Transaction
): Promise<web3.Transaction> {
  const provider = new anchor.AnchorProvider(connection, wallet, {});
  const namespacesProgram = new anchor.Program<Namespaces>(
    NAMESPACES_IDL,
    NAMESPACES_PROGRAM_ID,
    provider
  );

  const [globalContextId, bump] = await web3.PublicKey.findProgramAddress(
    [anchor.utils.bytes.utf8.encode(GLOBAL_CONTEXT_SEED)],
    namespacesProgram.programId
  );

  transaction.add(
    namespacesProgram.instruction.init(
      {
        rentPercentage: new anchor.BN(rentalPercentage),
        bump,
      },
      {
        accounts: {
          globalContext: globalContextId,
          authority: provider.wallet.publicKey,
          payer: provider.wallet.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
        },
      }
    )
  );
  return transaction;
}

export async function withCreateNamespace(
  connection: web3.Connection,
  wallet: Wallet,
  name: string,
  updateAuthority: web3.PublicKey,
  rentAuthority: web3.PublicKey,
  approveAuthority: web3.PublicKey | null,
  schema: number,
  paymentAmountDaily: anchor.BN,
  paymentMint: web3.PublicKey,
  minRentalSeconds: anchor.BN,
  maxRentalSeconds: anchor.BN | null,
  transferableEntries: boolean,
  transaction: web3.Transaction
): Promise<web3.Transaction> {
  const provider = new anchor.AnchorProvider(connection, wallet, {});
  const namespacesProgram = new anchor.Program<Namespaces>(
    NAMESPACES_IDL,
    NAMESPACES_PROGRAM_ID,
    provider
  );

  const [namespaceId, bump] = await web3.PublicKey.findProgramAddress(
    [
      anchor.utils.bytes.utf8.encode(NAMESPACE_SEED),
      anchor.utils.bytes.utf8.encode(name),
    ],
    namespacesProgram.programId
  );

  transaction.add(
    namespacesProgram.instruction.createNamespace(
      {
        bump,
        name,
        updateAuthority,
        rentAuthority,
        approveAuthority,
        schema,
        paymentAmountDaily,
        paymentMint,
        minRentalSeconds,
        maxRentalSeconds,
        transferableEntries,
      },
      {
        accounts: {
          namespace: namespaceId,
          authority: provider.wallet.publicKey,
          payer: provider.wallet.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
        },
      }
    )
  );
  return transaction;
}

export async function withUpdateNamespace(
  connection: web3.Connection,
  wallet: Wallet,
  name: string,
  updateAuthority: web3.PublicKey,
  rentAuthority: web3.PublicKey,
  approveAuthority: web3.PublicKey | null,
  paymentAmountDaily: anchor.BN,
  paymentMint: web3.PublicKey,
  minRentalSeconds: anchor.BN,
  maxRentalSeconds: anchor.BN | null,
  transferableEntries: boolean,
  transaction: web3.Transaction
): Promise<web3.Transaction> {
  const provider = new anchor.AnchorProvider(connection, wallet, {});
  const namespacesProgram = new anchor.Program<Namespaces>(
    NAMESPACES_IDL,
    NAMESPACES_PROGRAM_ID,
    provider
  );

  const [namespaceId] = await web3.PublicKey.findProgramAddress(
    [
      anchor.utils.bytes.utf8.encode(NAMESPACE_SEED),
      anchor.utils.bytes.utf8.encode(name),
    ],
    namespacesProgram.programId
  );

  transaction.add(
    namespacesProgram.instruction.updateNamespace(
      {
        updateAuthority,
        rentAuthority,
        approveAuthority,
        paymentAmountDaily,
        paymentMint,
        minRentalSeconds,
        maxRentalSeconds,
        transferableEntries,
      },
      {
        accounts: {
          namespace: namespaceId,
          updateAuthority: provider.wallet.publicKey,
        },
      }
    )
  );
  return transaction;
}

export async function withInitEntry(
  connection: web3.Connection,
  wallet: Wallet,
  certificateMintId: web3.PublicKey,
  namespaceName: string,
  entryName: string,
  transaction: web3.Transaction
): Promise<web3.Transaction> {
  const provider = new anchor.AnchorProvider(connection, wallet, {});
  const namespacesProgram = new anchor.Program<Namespaces>(
    NAMESPACES_IDL,
    NAMESPACES_PROGRAM_ID,
    provider
  );

  const [namespaceId] = await web3.PublicKey.findProgramAddress(
    [
      anchor.utils.bytes.utf8.encode(NAMESPACE_SEED),
      anchor.utils.bytes.utf8.encode(namespaceName),
    ],
    namespacesProgram.programId
  );

  const [entryId, entryBump] = await web3.PublicKey.findProgramAddress(
    [
      anchor.utils.bytes.utf8.encode(ENTRY_SEED),
      namespaceId.toBytes(),
      anchor.utils.bytes.utf8.encode(entryName),
    ],
    namespacesProgram.programId
  );

  const [mintManagerId, mintManagerBump] =
    await web3.PublicKey.findProgramAddress(
      [
        anchor.utils.bytes.utf8.encode(MINT_MANAGER_SEED),
        certificateMintId.toBytes(),
      ],
      CERTIFICATE_PROGRAM_ID
    );

  const [certificateMintMetadataId] = await web3.PublicKey.findProgramAddress(
    [
      Buffer.from(mplTokenMetadata.MetadataProgram.PREFIX),
      mplTokenMetadata.MetadataProgram.PUBKEY.toBuffer(),
      certificateMintId.toBuffer(),
    ],
    mplTokenMetadata.MetadataProgram.PUBKEY
  );

  const mintBalanceNeeded = await splToken.Token.getMinBalanceRentForExemptMint(
    provider.connection
  );

  transaction.add(
    web3.SystemProgram.createAccount({
      fromPubkey: provider.wallet.publicKey,
      newAccountPubkey: certificateMintId,
      lamports: mintBalanceNeeded,
      space: splToken.MintLayout.span,
      programId: splToken.TOKEN_PROGRAM_ID,
    })
  );

  const namespaceCertificateTokenAccountId =
    await splToken.Token.getAssociatedTokenAddress(
      splToken.ASSOCIATED_TOKEN_PROGRAM_ID,
      splToken.TOKEN_PROGRAM_ID,
      certificateMintId,
      namespaceId,
      true
    );

  transaction.add(
    namespacesProgram.instruction.initEntry(
      {
        name: entryName,
        entryBump,
        mintManagerBump,
      },
      {
        accounts: {
          namespace: namespaceId,
          entry: entryId,
          payer: provider.wallet.publicKey,
          namespaceCertificateTokenAccount: namespaceCertificateTokenAccountId,

          // cpi
          mintManager: mintManagerId,
          certificateMint: certificateMintId,
          certificateMintMetadata: certificateMintMetadataId,

          // programs
          certificateProgram: CERTIFICATE_PROGRAM_ID,
          tokenMetadataProgram: mplTokenMetadata.MetadataProgram.PUBKEY,
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

export async function withCreateClaimRequest(
  connection: web3.Connection,
  wallet: Wallet,
  namespaceName: string,
  entryName: string,
  user: web3.PublicKey,
  transaction: web3.Transaction
): Promise<web3.Transaction> {
  const provider = new anchor.AnchorProvider(connection, wallet, {});
  const namespacesProgram = new anchor.Program<Namespaces>(
    NAMESPACES_IDL,
    NAMESPACES_PROGRAM_ID,
    provider
  );
  const [namespaceId] = await web3.PublicKey.findProgramAddress(
    [
      anchor.utils.bytes.utf8.encode(NAMESPACE_SEED),
      anchor.utils.bytes.utf8.encode(namespaceName),
    ],
    namespacesProgram.programId
  );

  const [claimRequestId, claimRequestBump] =
    await web3.PublicKey.findProgramAddress(
      [
        anchor.utils.bytes.utf8.encode(CLAIM_REQUEST_SEED),
        namespaceId.toBytes(),
        anchor.utils.bytes.utf8.encode(entryName),
        user.toBytes(),
      ],
      namespacesProgram.programId
    );

  transaction.add(
    namespacesProgram.instruction.createClaimRequest(
      entryName,
      claimRequestBump,
      user,
      {
        accounts: {
          namespace: namespaceId,
          payer: provider.wallet.publicKey,
          claimRequest: claimRequestId,
          systemProgram: anchor.web3.SystemProgram.programId,
        },
      }
    )
  );
  return transaction;
}

export async function withUpdateClaimRequest(
  connection: web3.Connection,
  wallet: Wallet,
  namespaceName: string,
  claimRequestId: web3.PublicKey,
  isApproved: boolean,
  transaction: web3.Transaction
): Promise<web3.Transaction> {
  const provider = new anchor.AnchorProvider(connection, wallet, {});
  const namespacesProgram = new anchor.Program<Namespaces>(
    NAMESPACES_IDL,
    NAMESPACES_PROGRAM_ID,
    provider
  );
  const [namespaceId] = await web3.PublicKey.findProgramAddress(
    [
      anchor.utils.bytes.utf8.encode(NAMESPACE_SEED),
      anchor.utils.bytes.utf8.encode(namespaceName),
    ],
    namespacesProgram.programId
  );
  transaction.add(
    namespacesProgram.instruction.updateClaimRequest(isApproved, {
      accounts: {
        namespace: namespaceId,
        approveAuthority: provider.wallet.publicKey,
        rentRequest: claimRequestId,
      },
    })
  );
  return transaction;
}

export async function withClaimEntry(
  connection: web3.Connection,
  wallet: Wallet,
  namespaceName: string,
  entryName: string,
  certificateMintId: web3.PublicKey,
  duration: number,
  transaction: web3.Transaction
): Promise<web3.Transaction> {
  const provider = new anchor.AnchorProvider(connection, wallet, {});
  const namespacesProgram = new anchor.Program<Namespaces>(
    NAMESPACES_IDL,
    NAMESPACES_PROGRAM_ID,
    provider
  );
  const [namespaceId] = await web3.PublicKey.findProgramAddress(
    [
      anchor.utils.bytes.utf8.encode(NAMESPACE_SEED),
      anchor.utils.bytes.utf8.encode(namespaceName),
    ],
    namespacesProgram.programId
  );

  const [entryId] = await web3.PublicKey.findProgramAddress(
    [
      anchor.utils.bytes.utf8.encode(ENTRY_SEED),
      namespaceId.toBytes(),
      anchor.utils.bytes.utf8.encode(entryName),
    ],
    namespacesProgram.programId
  );

  const [claimRequestId] = await web3.PublicKey.findProgramAddress(
    [
      anchor.utils.bytes.utf8.encode(CLAIM_REQUEST_SEED),
      namespaceId.toBytes(),
      anchor.utils.bytes.utf8.encode(entryName),
      provider.wallet.publicKey.toBytes(),
    ],
    namespacesProgram.programId
  );

  const namespace = await namespacesProgram.account.namespace.fetch(
    namespaceId
  );

  const [certificateId, certificateBump] =
    await web3.PublicKey.findProgramAddress(
      [
        anchor.utils.bytes.utf8.encode(CERTIFICATE_SEED),
        certificateMintId.toBuffer(),
      ],
      CERTIFICATE_PROGRAM_ID
    );

  const [mintManagerId] = await web3.PublicKey.findProgramAddress(
    [
      anchor.utils.bytes.utf8.encode(MINT_MANAGER_SEED),
      certificateMintId.toBytes(),
    ],
    CERTIFICATE_PROGRAM_ID
  );

  const namespaceCertificateTokenAccountId =
    await splToken.Token.getAssociatedTokenAddress(
      splToken.ASSOCIATED_TOKEN_PROGRAM_ID,
      splToken.TOKEN_PROGRAM_ID,
      certificateMintId,
      namespaceId,
      true
    );

  const certificatePaymentTokenAccountId =
    await withFindOrInitAssociatedTokenAccount(
      transaction,
      provider.connection,
      namespace.paymentMint,
      certificateId,
      provider.wallet.publicKey,
      true
    );

  const userCertificateTokenAccountId =
    await withFindOrInitAssociatedTokenAccount(
      transaction,
      provider.connection,
      certificateMintId,
      provider.wallet.publicKey,
      provider.wallet.publicKey
    );

  const userPaymentTokenAccountId = await withFindOrInitAssociatedTokenAccount(
    transaction,
    provider.connection,
    namespace.paymentMint,
    provider.wallet.publicKey,
    provider.wallet.publicKey
  );

  const certificateTokenAccountId =
    await splToken.Token.getAssociatedTokenAddress(
      splToken.ASSOCIATED_TOKEN_PROGRAM_ID,
      splToken.TOKEN_PROGRAM_ID,
      certificateMintId,
      certificateId,
      true
    );
  transaction.add(
    namespacesProgram.instruction.claimEntry(
      {
        duration: duration > 0 ? new anchor.BN(duration) : null,
        certificateBump,
      },
      {
        accounts: {
          namespace: namespaceId,
          entry: entryId,
          user: provider.wallet.publicKey,
          payer: provider.wallet.publicKey,
          paymentMint: namespace.paymentMint,
          claimRequest: claimRequestId,

          // CPI accounts
          mintManager: mintManagerId,
          certificate: certificateId,
          certificateMint: certificateMintId,
          certificateTokenAccount: certificateTokenAccountId,
          certificatePaymentTokenAccount: certificatePaymentTokenAccountId,
          userCertificateTokenAccount: userCertificateTokenAccountId,
          userPaymentTokenAccount: userPaymentTokenAccountId,
          namespaceCertificateTokenAccount: namespaceCertificateTokenAccountId,

          // programs
          certificateProgram: CERTIFICATE_PROGRAM_ID,
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

export async function withSetEntryData(
  connection: web3.Connection,
  wallet: Wallet,
  namespaceName: string,
  entryName: string,
  entryData: web3.PublicKey,
  transaction: web3.Transaction
): Promise<web3.Transaction> {
  const provider = new anchor.AnchorProvider(connection, wallet, {});
  const namespacesProgram = new anchor.Program<Namespaces>(
    NAMESPACES_IDL,
    NAMESPACES_PROGRAM_ID,
    provider
  );
  const [namespaceId] = await web3.PublicKey.findProgramAddress(
    [
      anchor.utils.bytes.utf8.encode(NAMESPACE_SEED),
      anchor.utils.bytes.utf8.encode(namespaceName),
    ],
    namespacesProgram.programId
  );

  const [entryId] = await web3.PublicKey.findProgramAddress(
    [
      anchor.utils.bytes.utf8.encode(ENTRY_SEED),
      namespaceId.toBytes(),
      anchor.utils.bytes.utf8.encode(entryName),
    ],
    namespacesProgram.programId
  );

  const entry = await namespacesProgram.account.entry.fetch(entryId);
  const [certificateId] = await certificate.certificateIdForMint(entry.mint);

  const userCertificateTokenAccountId =
    await withFindOrInitAssociatedTokenAccount(
      transaction,
      provider.connection,
      entry.mint,
      provider.wallet.publicKey,
      provider.wallet.publicKey
    );

  transaction.add(
    namespacesProgram.instruction.setEntryData(entryData, {
      accounts: {
        namespace: namespaceId,
        entry: entryId,

        userCertificateTokenAccount: userCertificateTokenAccountId,
        certificate: certificateId,

        user: provider.wallet.publicKey,
        payer: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      },
    })
  );
  return transaction;
}

export async function withSetReverseEntry(
  connection: web3.Connection,
  wallet: Wallet,
  namespaceName: string,
  entryName: string,
  certificateMintId: web3.PublicKey,
  transaction: web3.Transaction
): Promise<web3.Transaction> {
  const provider = new anchor.AnchorProvider(connection, wallet, {});
  const namespacesProgram = new anchor.Program<Namespaces>(
    NAMESPACES_IDL,
    NAMESPACES_PROGRAM_ID,
    provider
  );
  const [namespaceId] = await web3.PublicKey.findProgramAddress(
    [
      anchor.utils.bytes.utf8.encode(NAMESPACE_SEED),
      anchor.utils.bytes.utf8.encode(namespaceName),
    ],
    namespacesProgram.programId
  );

  const [entryId] = await web3.PublicKey.findProgramAddress(
    [
      anchor.utils.bytes.utf8.encode(ENTRY_SEED),
      namespaceId.toBytes(),
      anchor.utils.bytes.utf8.encode(entryName),
    ],
    namespacesProgram.programId
  );

  const [reverseEntryId, reverseEntryBump] =
    await web3.PublicKey.findProgramAddress(
      [
        anchor.utils.bytes.utf8.encode(REVERSE_ENTRY_SEED),
        wallet.publicKey.toBytes(),
      ],
      namespacesProgram.programId
    );

  const [certificateId] = await certificate.certificateIdForMint(
    certificateMintId
  );

  const userCertificateTokenAccountId =
    await splToken.Token.getAssociatedTokenAddress(
      splToken.ASSOCIATED_TOKEN_PROGRAM_ID,
      splToken.TOKEN_PROGRAM_ID,
      certificateMintId,
      provider.wallet.publicKey
    );

  transaction.add(
    namespacesProgram.instruction.setReverseEntry(reverseEntryBump, {
      accounts: {
        namespace: namespaceId,
        entry: entryId,
        reverseEntry: reverseEntryId,

        userCertificateTokenAccount: userCertificateTokenAccountId,
        certificate: certificateId,

        user: provider.wallet.publicKey,
        payer: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      },
    })
  );
  return transaction;
}

export async function withRevokeReverseEntry(
  connection: web3.Connection,
  wallet: Wallet,
  namespaceName: string,
  entryName: string,
  reverseEntryId: web3.PublicKey,
  claimRequestId: web3.PublicKey,
  transaction: web3.Transaction
): Promise<web3.Transaction> {
  const provider = new anchor.AnchorProvider(connection, wallet, {});
  const namespacesProgram = new anchor.Program<Namespaces>(
    NAMESPACES_IDL,
    NAMESPACES_PROGRAM_ID,
    provider
  );
  const [namespaceId] = await web3.PublicKey.findProgramAddress(
    [
      anchor.utils.bytes.utf8.encode(NAMESPACE_SEED),
      anchor.utils.bytes.utf8.encode(namespaceName),
    ],
    namespacesProgram.programId
  );

  const [entryId] = await web3.PublicKey.findProgramAddress(
    [
      anchor.utils.bytes.utf8.encode(ENTRY_SEED),
      namespaceId.toBytes(),
      anchor.utils.bytes.utf8.encode(entryName),
    ],
    namespacesProgram.programId
  );

  transaction.add(
    namespacesProgram.instruction.revokeReverseEntry({
      accounts: {
        namespace: namespaceId,
        entry: entryId,
        reverseEntry: reverseEntryId,
        claimRequest: claimRequestId,
        invalidator: wallet.publicKey,
      },
    })
  );
  return transaction;
}

export async function withRevokeEntry(
  connection: web3.Connection,
  wallet: Wallet,
  namespaceName: string,
  entryName: string,
  certificateMintId: web3.PublicKey,
  certificateOwnerId: web3.PublicKey,
  claimRequestId: web3.PublicKey,
  transaction: web3.Transaction
): Promise<web3.Transaction> {
  const provider = new anchor.AnchorProvider(connection, wallet, {});
  const namespacesProgram = new anchor.Program<Namespaces>(
    NAMESPACES_IDL,
    NAMESPACES_PROGRAM_ID,
    provider
  );
  const [namespaceId] = await web3.PublicKey.findProgramAddress(
    [
      anchor.utils.bytes.utf8.encode(NAMESPACE_SEED),
      anchor.utils.bytes.utf8.encode(namespaceName),
    ],
    namespacesProgram.programId
  );

  const [entryId] = await web3.PublicKey.findProgramAddress(
    [
      anchor.utils.bytes.utf8.encode(ENTRY_SEED),
      namespaceId.toBytes(),
      anchor.utils.bytes.utf8.encode(entryName),
    ],
    namespacesProgram.programId
  );

  const namespace = await namespacesProgram.account.namespace.fetch(
    namespaceId
  );

  const [certificateId] = await web3.PublicKey.findProgramAddress(
    [
      anchor.utils.bytes.utf8.encode(CERTIFICATE_SEED),
      certificateMintId.toBuffer(),
    ],
    CERTIFICATE_PROGRAM_ID
  );

  const [mintManagerId] = await web3.PublicKey.findProgramAddress(
    [
      anchor.utils.bytes.utf8.encode(MINT_MANAGER_SEED),
      certificateMintId.toBytes(),
    ],
    CERTIFICATE_PROGRAM_ID
  );

  const namespaceCertificateTokenAccountId =
    await splToken.Token.getAssociatedTokenAddress(
      splToken.ASSOCIATED_TOKEN_PROGRAM_ID,
      splToken.TOKEN_PROGRAM_ID,
      certificateMintId,
      namespaceId,
      true
    );

  const namespacePaymentTokenAccountId =
    await withFindOrInitAssociatedTokenAccount(
      transaction,
      provider.connection,
      namespace.paymentMint,
      namespaceId,
      provider.wallet.publicKey,
      true
    );

  const certificatePaymentTokenAccountId =
    await splToken.Token.getAssociatedTokenAddress(
      splToken.ASSOCIATED_TOKEN_PROGRAM_ID,
      splToken.TOKEN_PROGRAM_ID,
      namespace.paymentMint,
      certificateId,
      true
    );

  const userCertificateTokenAccountId =
    await splToken.Token.getAssociatedTokenAddress(
      splToken.ASSOCIATED_TOKEN_PROGRAM_ID,
      splToken.TOKEN_PROGRAM_ID,
      certificateMintId,
      certificateOwnerId
    );

  const userPaymentTokenAccountId = await withFindOrInitAssociatedTokenAccount(
    transaction,
    provider.connection,
    namespace.paymentMint,
    certificateOwnerId,
    provider.wallet.publicKey
  );

  const certificateTokenAccountId =
    await splToken.Token.getAssociatedTokenAddress(
      splToken.ASSOCIATED_TOKEN_PROGRAM_ID,
      splToken.TOKEN_PROGRAM_ID,
      certificateMintId,
      certificateId,
      true
    );

  transaction.add(
    namespacesProgram.instruction.revokeEntry({
      accounts: {
        namespace: namespaceId,
        entry: entryId,
        claimRequest: claimRequestId,
        namespaceCertificateTokenAccount: namespaceCertificateTokenAccountId,
        namespacePaymentTokenAccount: namespacePaymentTokenAccountId,
        invalidator: provider.wallet.publicKey,

        // CPI accounts
        mintManager: mintManagerId,
        certificate: certificateId,
        certificateMint: certificateMintId,
        certificateTokenAccount: certificateTokenAccountId,
        certificatePaymentTokenAccount: certificatePaymentTokenAccountId,
        userCertificateTokenAccount: userCertificateTokenAccountId,
        userPaymentTokenAccount: userPaymentTokenAccountId,

        // programs
        certificateProgram: CERTIFICATE_PROGRAM_ID,
        tokenProgram: splToken.TOKEN_PROGRAM_ID,
      },
    })
  );
  return transaction;
}

export async function withUpdateMintMetadata(
  connection: web3.Connection,
  wallet: Wallet,
  namespaceId: web3.PublicKey,
  entryId: web3.PublicKey,
  certificateMintId: web3.PublicKey,
  transaction: web3.Transaction
): Promise<web3.Transaction> {
  const provider = new anchor.AnchorProvider(connection, wallet, {});
  const namespacesProgram = new anchor.Program<Namespaces>(
    NAMESPACES_IDL,
    NAMESPACES_PROGRAM_ID,
    provider
  );

  const [certificateMintMetadataId] = await web3.PublicKey.findProgramAddress(
    [
      anchor.utils.bytes.utf8.encode(mplTokenMetadata.MetadataProgram.PREFIX),
      mplTokenMetadata.MetadataProgram.PUBKEY.toBuffer(),
      certificateMintId.toBuffer(),
    ],
    mplTokenMetadata.MetadataProgram.PUBKEY
  );

  transaction.add(
    namespacesProgram.instruction.updateEntryMintMetadata({
      accounts: {
        namespace: namespaceId,
        entry: entryId,
        certificateMintMetadata: certificateMintMetadataId,
        tokenMetadataProgram: mplTokenMetadata.MetadataProgram.PUBKEY,
      },
    })
  );
  return transaction;
}
