import * as anchor from "@project-serum/anchor";
import * as web3 from "@solana/web3.js";
import { Wallet } from "@saberhq/solana-contrib";
import * as splToken from "@solana/spl-token";
import { CardinalCertificate } from "./types/idl";
import {
  CERTIFICATE_IDL,
  CertificateKind,
  CERTIFICATE_PROGRAM_ID,
  CERTIFICATE_SEED,
  MINT_MANAGER_SEED,
  withFindOrInitAssociatedTokenAccount,
} from "./utils";

/**
 * Add a new issue certificate instruction to this transaction
 *
 * @param connection Solana connection
 * @param wallet Anchor wallet interface
 * @param certificateKind
 * @param duration
 * @param startAtIssuance
 * @param totalUsages
 * @param amount
 * @param paymentMint
 * @param paymentAmount
 * @param isReturnable
 * @param isExtendable
 * @param revokeAuthority
 * @param issuer
 * @param issuerTokenAccount
 * @param certificateMintId
 * @param originalMint
 * @param recipient
 * @param transaction
 * @returns Transaction with instruction added
 */
export async function withIssueCertificate(
  connection: web3.Connection,
  wallet: Wallet,
  transaction: web3.Transaction,
  params: {
    certificateKind: CertificateKind;
    duration: number;
    startAtIssuance: boolean;
    totalUsages: number;
    amount: number;
    paymentMint: web3.PublicKey | null;
    paymentAmount: number;
    isReturnable: boolean;
    isExtendable: boolean;
    revokeAuthority: web3.PublicKey;
    issuer: web3.PublicKey;
    issuerTokenAccount: web3.PublicKey;
    certificateMint: web3.PublicKey;
    originalMint: web3.PublicKey | null;
    recipient: web3.PublicKey | null;
  }
): Promise<[web3.Transaction, web3.PublicKey]> {
  const provider = new anchor.AnchorProvider(connection, wallet, {});
  const program = new anchor.Program<CardinalCertificate>(
    CERTIFICATE_IDL,
    CERTIFICATE_PROGRAM_ID,
    provider
  );

  const [mintManagerId, mintManagerBump] =
    await web3.PublicKey.findProgramAddress(
      [
        anchor.utils.bytes.utf8.encode(MINT_MANAGER_SEED),
        params.certificateMint.toBuffer(),
      ],
      program.programId
    );

  const [certificateId, bump] = await web3.PublicKey.findProgramAddress(
    [
      anchor.utils.bytes.utf8.encode(CERTIFICATE_SEED),
      params.certificateMint.toBuffer(),
    ],
    program.programId
  );

  const mintManagerAccount = await connection.getAccountInfo(mintManagerId);
  if (!mintManagerAccount) {
    transaction.add(
      program.instruction.createMintManager(mintManagerBump, {
        accounts: {
          mintManager: mintManagerId,
          mint: params.certificateMint,
          freezeAuthority: params.issuer,
          payer: params.issuer,
          systemProgram: anchor.web3.SystemProgram.programId,
          tokenProgram: splToken.TOKEN_PROGRAM_ID,
        },
      })
    );
  }

  const certificateTokenAccount = await withFindOrInitAssociatedTokenAccount(
    transaction,
    connection,
    params.certificateMint,
    certificateId,
    provider.wallet.publicKey,
    true
  );

  transaction.add(
    program.instruction.issueCertificate(
      {
        amount: new anchor.BN(params.amount),
        bump,
        recipient: params.recipient,
        kind: params.certificateKind,
        paymentMint: params.paymentMint,
        paymentAmount: params.paymentAmount
          ? new anchor.BN(params.paymentAmount)
          : null,
        duration: params.duration ? new anchor.BN(params.duration) : null,
        startAtIssuance: params.startAtIssuance,
        totalUsages: params.totalUsages
          ? new anchor.BN(params.totalUsages)
          : null,
        revokeAuthority: params.revokeAuthority,
        isReturnable: params.isReturnable,
        isExtendable: params.isExtendable,
      },
      {
        accounts: {
          mintManager: mintManagerId,
          certificate: certificateId,
          certificateTokenAccount,
          certificateMint: params.certificateMint,
          issuer: params.issuer,
          issuerTokenAccount: params.issuerTokenAccount,
          payer: provider.wallet.publicKey,
          tokenProgram: splToken.TOKEN_PROGRAM_ID,
          systemProgram: anchor.web3.SystemProgram.programId,
        },
      }
    )
  );

  if (params.originalMint) {
    const issuerOriginalMintTokenAccount =
      await withFindOrInitAssociatedTokenAccount(
        transaction,
        connection,
        params.originalMint,
        certificateId,
        provider.wallet.publicKey,
        true
      );
    transaction.add(
      program.instruction.setOriginalMint({
        accounts: {
          certificate: certificateId,
          originalMintHolder: params.issuer,
          originalMintTokenAccount: issuerOriginalMintTokenAccount,
        },
      })
    );
  }
  return [transaction, certificateId];
}

/**
 * Add a claim certificate instruction to this transaction
 * @param connection
 * @param wallet
 * @param certificateId
 * @param transaction
 * @returns Transaction with instruction added
 */
export async function withClaimCertificate(
  connection: web3.Connection,
  wallet: Wallet,
  transaction: web3.Transaction,
  params: {
    certificateMint: web3.PublicKey;
  }
): Promise<web3.Transaction> {
  const provider = new anchor.AnchorProvider(connection, wallet, {});
  const program = new anchor.Program<CardinalCertificate>(
    CERTIFICATE_IDL,
    CERTIFICATE_PROGRAM_ID,
    provider
  );

  const [certificateId] = await web3.PublicKey.findProgramAddress(
    [
      anchor.utils.bytes.utf8.encode(CERTIFICATE_SEED),
      params.certificateMint.toBuffer(),
    ],
    program.programId
  );

  const certificate = await program.account.certificate.fetch(certificateId);

  const [mintManagerId] = await web3.PublicKey.findProgramAddress(
    [
      anchor.utils.bytes.utf8.encode(MINT_MANAGER_SEED),
      certificate.mint.toBuffer(),
    ],
    program.programId
  );

  // assume this is here already
  const certificateTokenAccountId =
    await splToken.Token.getAssociatedTokenAddress(
      splToken.ASSOCIATED_TOKEN_PROGRAM_ID,
      splToken.TOKEN_PROGRAM_ID,
      certificate.mint,
      certificateId,
      true
    );

  const recipientTokenAccountId = await withFindOrInitAssociatedTokenAccount(
    transaction,
    connection,
    certificate.mint,
    wallet.publicKey,
    wallet.publicKey,
    true
  );

  // assume this is here already
  const certificatePaymentTokenAccountId = certificate.paymentMint
    ? await withFindOrInitAssociatedTokenAccount(
      transaction,
      connection,
      // @ts-ignore TODO
      certificate.paymentMint,
      certificateId,
      provider.wallet.publicKey,
      true
    )
    : certificateTokenAccountId;

  // assume this is already here
  const recipientPaymentTokenAccountId = certificate.paymentMint
    ? await withFindOrInitAssociatedTokenAccount(
      transaction,
      connection,
      // @ts-ignore TODO
      certificate.paymentMint,
      wallet.publicKey,
      provider.wallet.publicKey
    )
    : recipientTokenAccountId;

  transaction.add(
    program.instruction.claimCertificate({
      accounts: {
        mintManager: mintManagerId,
        certificate: certificateId,
        certificateMint: certificate.mint,
        recipient: wallet.publicKey,
        certificatePaymentTokenAccount: certificatePaymentTokenAccountId,
        certificateTokenAccount: certificateTokenAccountId,
        recipientTokenAccount: recipientTokenAccountId,
        recipientPaymentTokenAccount: recipientPaymentTokenAccountId,
        tokenProgram: splToken.TOKEN_PROGRAM_ID,
      },
    })
  );

  return transaction;
}

/**
 * Adds unissue certificate instruction
 * @param connection
 * @param wallet
 * @param certificateMint
 * @param transaction
 * @returns Transaction with instruction added
 */
export async function withUnissueCertificate(
  connection: web3.Connection,
  wallet: Wallet,
  transaction: web3.Transaction,
  params: {
    certificateMint: web3.PublicKey;
  }
) {
  const provider = new anchor.AnchorProvider(connection, wallet, {});
  const program = new anchor.Program<CardinalCertificate>(
    CERTIFICATE_IDL,
    CERTIFICATE_PROGRAM_ID,
    provider
  );

  const [mintManagerId] = await web3.PublicKey.findProgramAddress(
    [
      anchor.utils.bytes.utf8.encode(MINT_MANAGER_SEED),
      params.certificateMint.toBuffer(),
    ],
    program.programId
  );

  const [certificateId] = await web3.PublicKey.findProgramAddress(
    [
      anchor.utils.bytes.utf8.encode(CERTIFICATE_SEED),
      params.certificateMint.toBuffer(),
    ],
    program.programId
  );

  const certificateTokenAccount =
    await splToken.Token.getAssociatedTokenAddress(
      splToken.ASSOCIATED_TOKEN_PROGRAM_ID,
      splToken.TOKEN_PROGRAM_ID,
      params.certificateMint,
      certificateId,
      true
    );

  const issuerTokenAccount = await withFindOrInitAssociatedTokenAccount(
    transaction,
    connection,
    params.certificateMint,
    provider.wallet.publicKey,
    provider.wallet.publicKey,
    true
  );

  transaction.add(
    program.instruction.unissueCertificate({
      accounts: {
        mintManager: mintManagerId,
        certificate: certificateId,
        certificateTokenAccount,
        certificateMint: params.certificateMint,
        issuer: wallet.publicKey,
        issuerTokenAccount: issuerTokenAccount,
        tokenProgram: splToken.TOKEN_PROGRAM_ID,
      },
    })
  );
  return transaction;
}

/**
 * Adds use certificate instruction
 * @param connection
 * @param wallet
 * @param certificateMint
 * @param transaction
 * @returns Transaction with use instruction added
 */
export async function withUseCertificate(
  connection: web3.Connection,
  wallet: Wallet,
  transaction: web3.Transaction,
  params: {
    certificateMint: web3.PublicKey;
  }
) {
  const provider = new anchor.AnchorProvider(connection, wallet, {});
  const program = new anchor.Program<CardinalCertificate>(
    CERTIFICATE_IDL,
    CERTIFICATE_PROGRAM_ID,
    provider
  );

  const [certificateId] = await web3.PublicKey.findProgramAddress(
    [
      anchor.utils.bytes.utf8.encode(CERTIFICATE_SEED),
      params.certificateMint.toBuffer(),
    ],
    program.programId
  );

  const certificate = await program.account.certificate.fetch(certificateId);

  let instruction = await program.methods.useCertificate().accounts({
    certificate: certificateId,
    user: wallet.publicKey,
    recipientTokenAccount: certificate.recipientTokenAccount!,
  }).instruction()

  transaction.add(
    instruction
  );
  return transaction;
}

/**
 * Adds revoke certificate instruction
 * @param connection
 * @param wallet
 * @param certificateMint
 * @param transaction
 * @returns Transaction with revoke certificate instruction added
 */
export async function withRevokeCertificate(
  connection: web3.Connection,
  wallet: Wallet,
  transaction: web3.Transaction,
  params: {
    certificateMint: web3.PublicKey;
  }
): Promise<web3.Transaction> {
  const provider = new anchor.AnchorProvider(connection, wallet, {});
  const program = new anchor.Program<CardinalCertificate>(
    CERTIFICATE_IDL,
    CERTIFICATE_PROGRAM_ID,
    provider
  );

  const [mintManagerId] = await web3.PublicKey.findProgramAddress(
    [
      anchor.utils.bytes.utf8.encode(MINT_MANAGER_SEED),
      params.certificateMint.toBuffer(),
    ],
    program.programId
  );

  const [certificateId] = await web3.PublicKey.findProgramAddress(
    [
      anchor.utils.bytes.utf8.encode(CERTIFICATE_SEED),
      params.certificateMint.toBuffer(),
    ],
    program.programId
  );

  const certificate = await program.account.certificate.fetch(certificateId);

  const certificateTokenAccountId =
    await splToken.Token.getAssociatedTokenAddress(
      splToken.ASSOCIATED_TOKEN_PROGRAM_ID,
      splToken.TOKEN_PROGRAM_ID,
      params.certificateMint,
      certificateId,
      true
    );

  const issuerTokenAccountId = await withFindOrInitAssociatedTokenAccount(
    transaction,
    connection,
    params.certificateMint,
    certificate.issuer,
    provider.wallet.publicKey,
    true
  );

  const certificatePaymentTokenAccountId = certificate.paymentMint
    ? await withFindOrInitAssociatedTokenAccount(
      transaction,
      connection,
      // @ts-ignore TODO
      certificate.paymentMint,
      certificateId,
      provider.wallet.publicKey,
      true
    )
    : certificateTokenAccountId;

  const recipientPaymentTokenAccountId = certificate.paymentMint
    ? await withFindOrInitAssociatedTokenAccount(
      transaction,
      connection,
      // @ts-ignore TODO
      certificate.paymentMint,
      certificate.recipient!,
      provider.wallet.publicKey
    )
    : certificate.recipientTokenAccount;

  const issuerPaymentTokenAccountId = certificate.paymentMint
    ? await withFindOrInitAssociatedTokenAccount(
      transaction,
      connection,
      // @ts-ignore TODO
      certificate.paymentMint,
      certificate.issuer,
      provider.wallet.publicKey
    )
    : issuerTokenAccountId;

  const instruction = await program.methods.revokeCertificate().accounts({
    mintManager: mintManagerId,
    certificate: certificateId,
    certificateMint: certificate.mint,
    certificateTokenAccount: certificateTokenAccountId,
    certificatePaymentTokenAccount: certificatePaymentTokenAccountId,
    recipientTokenAccount: certificate.recipientTokenAccount!,
    recipientPaymentTokenAccount: recipientPaymentTokenAccountId!,
    issuerTokenAccount: issuerTokenAccountId,
    issuerPaymentTokenAccount: issuerPaymentTokenAccountId,
    revokeAuthority: wallet.publicKey,
    tokenProgram: splToken.TOKEN_PROGRAM_ID,
  }).instruction()

  transaction.add(instruction);

  return transaction;
}

/**
 * Add invalidate certificate instruction
 * @param connection
 * @param wallet
 * @param certificateMint
 * @param transaction
 * @returns Transaction with instruction added
 */
export async function withInvalidateCertificate(
  connection: web3.Connection,
  wallet: Wallet,
  transaction: web3.Transaction,
  params: {
    certificateMint: web3.PublicKey;
  }
): Promise<web3.Transaction> {
  const provider = new anchor.AnchorProvider(connection, wallet, {});
  const program = new anchor.Program<CardinalCertificate>(
    CERTIFICATE_IDL,
    CERTIFICATE_PROGRAM_ID,
    provider
  );

  const [mintManagerId] = await web3.PublicKey.findProgramAddress(
    [
      anchor.utils.bytes.utf8.encode(MINT_MANAGER_SEED),
      params.certificateMint.toBuffer(),
    ],
    program.programId
  );

  const [certificateId] = await web3.PublicKey.findProgramAddress(
    [
      anchor.utils.bytes.utf8.encode(CERTIFICATE_SEED),
      params.certificateMint.toBuffer(),
    ],
    program.programId
  );

  const certificate = await program.account.certificate.fetch(certificateId);

  const certificateTokenAccountId =
    await splToken.Token.getAssociatedTokenAddress(
      splToken.ASSOCIATED_TOKEN_PROGRAM_ID,
      splToken.TOKEN_PROGRAM_ID,
      params.certificateMint,
      certificateId,
      true
    );

  const invalidatorTokenAccountId = await withFindOrInitAssociatedTokenAccount(
    transaction,
    connection,
    params.certificateMint,
    wallet.publicKey,
    provider.wallet.publicKey
  );

  let issuerTokenAccountId = invalidatorTokenAccountId;
  if (certificate.issuer.toString() !== wallet.publicKey.toString()) {
    issuerTokenAccountId = await withFindOrInitAssociatedTokenAccount(
      transaction,
      connection,
      params.certificateMint,
      certificate.issuer,
      provider.wallet.publicKey
    );
  }

  const certificatePaymentTokenAccountId = certificate.paymentMint
    ? await withFindOrInitAssociatedTokenAccount(
      transaction,
      connection,
      // @ts-ignore TODO
      certificate.paymentMint,
      certificateId,
      provider.wallet.publicKey,
      true
    )
    : certificateTokenAccountId;

  const issuerPaymentTokenAccountId = certificate.paymentMint
    ? await withFindOrInitAssociatedTokenAccount(
      transaction,
      connection,
      // @ts-ignore TODO
      certificate.paymentMint,
      certificate.issuer,
      provider.wallet.publicKey
    )
    : issuerTokenAccountId;

  transaction.add(
    program.instruction.invalidateCertificate({
      accounts: {
        mintManager: mintManagerId,
        certificate: certificateId,
        certificateMint: certificate.mint,
        certificateTokenAccount: certificateTokenAccountId,
        certificatePaymentTokenAccount: certificatePaymentTokenAccountId,
        recipientTokenAccount:
          certificate.recipientTokenAccount || certificateTokenAccountId,
        issuerTokenAccount: issuerTokenAccountId,
        issuerPaymentTokenAccount: issuerPaymentTokenAccountId,
        invalidator: provider.wallet.publicKey,
        invalidatorTokenAccount: invalidatorTokenAccountId,
        tokenProgram: splToken.TOKEN_PROGRAM_ID,
      },
    })
  );

  return transaction;
}

/**
 * Adds revoke certificate instruction
 * @param connection
 * @param wallet
 * @param certificateMint
 * @param transaction
 * @returns Transaction with revoke certificate instruction added
 */
export async function withRevokeCertificateV2(
  connection: web3.Connection,
  wallet: Wallet,
  transaction: web3.Transaction,
  params: {
    certificateMint: web3.PublicKey;
    revokeRecipient: web3.PublicKey;
  }
): Promise<web3.Transaction> {
  const provider = new anchor.AnchorProvider(connection, wallet, {});
  const program = new anchor.Program<CardinalCertificate>(
    CERTIFICATE_IDL,
    CERTIFICATE_PROGRAM_ID,
    provider
  );

  const [mintManagerId] = await web3.PublicKey.findProgramAddress(
    [
      anchor.utils.bytes.utf8.encode(MINT_MANAGER_SEED),
      params.certificateMint.toBuffer(),
    ],
    program.programId
  );

  const [certificateId] = await web3.PublicKey.findProgramAddress(
    [
      anchor.utils.bytes.utf8.encode(CERTIFICATE_SEED),
      params.certificateMint.toBuffer(),
    ],
    program.programId
  );

  const certificate = await program.account.certificate.fetch(certificateId);

  const certificateTokenAccountId =
    await splToken.Token.getAssociatedTokenAddress(
      splToken.ASSOCIATED_TOKEN_PROGRAM_ID,
      splToken.TOKEN_PROGRAM_ID,
      params.certificateMint,
      certificateId,
      true
    );

  const issuerTokenAccountId = await withFindOrInitAssociatedTokenAccount(
    transaction,
    connection,
    params.certificateMint,
    certificate.issuer,
    provider.wallet.publicKey,
    true
  );

  const certificatePaymentTokenAccountId = certificate.paymentMint
    ? await withFindOrInitAssociatedTokenAccount(
      transaction,
      connection,
      // @ts-ignore TODO
      certificate.paymentMint,
      certificateId,
      provider.wallet.publicKey,
      true
    )
    : certificateTokenAccountId;

  const recipientPaymentTokenAccountId = certificate.paymentMint
    ? await withFindOrInitAssociatedTokenAccount(
      transaction,
      connection,
      // @ts-ignore TODO
      certificate.paymentMint,
      certificate.recipient!,
      provider.wallet.publicKey
    )
    : certificate.recipientTokenAccount;

  const issuerPaymentTokenAccountId = certificate.paymentMint
    ? await withFindOrInitAssociatedTokenAccount(
      transaction,
      connection,
      // @ts-ignore TODO
      certificate.paymentMint,
      certificate.issuer,
      provider.wallet.publicKey
    )
    : issuerTokenAccountId;

  const instruction = await program.methods.revokeCertificateV2()
    .accounts({
      mintManager: mintManagerId,
      certificate: certificateId,
      certificateMint: certificate.mint,
      certificateTokenAccount: certificateTokenAccountId,
      certificatePaymentTokenAccount: certificatePaymentTokenAccountId,
      recipientTokenAccount: certificate.recipientTokenAccount!,
      recipientPaymentTokenAccount: recipientPaymentTokenAccountId!,
      issuerTokenAccount: issuerTokenAccountId,
      issuerPaymentTokenAccount: issuerPaymentTokenAccountId,
      revokeAuthority: wallet.publicKey,
      revokeRecipient: params.revokeRecipient,
      tokenProgram: splToken.TOKEN_PROGRAM_ID,
    }).instruction()

  transaction.add(instruction);

  return transaction;
}
