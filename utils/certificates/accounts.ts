import * as anchor from "@project-serum/anchor";
import * as web3 from "@solana/web3.js";
import { AccountData, CertificateData } from "./types";
import {
  CERTIFICATE_IDL,
  certificateIdForMint,
  CertificateState,
  CERTIFICATE_PROGRAM_ID,
} from "./utils";

/**
 * Gets certificates for a a list of mintIds
 * @param connection
 * @param mints
 * @returns List of certificates for the given mintIds
 */
export async function getCertificatesForMints(
  connection: web3.Connection,
  mints: web3.PublicKey[]
) {
  // const certificatesIds: any = await Promise.all(
  //   mints.map((mint: any) => {
  //     certificateIdForMint(mint)[0] as any
  //   })
  // );
  // const provider = new anchor.AnchorProvider(connection, null as any, {});
  // const program = new anchor.Program(
  //   CERTIFICATE_IDL,
  //   CERTIFICATE_PROGRAM_ID,
  //   provider
  // );
  // const result = await program.account.certificate.fetchMultiple(
  //   certificatesIds
  // );
  // return result.map((parsed: CertificateData, i) => ({
  //   parsed,
  //   pubkey: certificatesIds[i],
  // }));
}

export async function getCertificate(
  connection: web3.Connection,
  certificateId: web3.PublicKey
){
  const provider = new anchor.AnchorProvider(connection, null as any, {});
  const program = new anchor.Program(
    CERTIFICATE_IDL,
    CERTIFICATE_PROGRAM_ID,
    provider
  );
  const parsed = await program.account.certificate.fetch(certificateId);
  return {
    parsed,
    pubkey: certificateId,
  };
}

/**
 * Get a list of certificates given a list of certificate public keys
 * @param connection
 * @param certificateIds
 * @returns List of certificates
 */
export async function getCertificates(
  connection: web3.Connection,
  certificateIds: web3.PublicKey[]
) {
  const provider = new anchor.AnchorProvider(connection, null as any, {});
  const program = new anchor.Program(
    CERTIFICATE_IDL,
    CERTIFICATE_PROGRAM_ID,
    provider
  );

  let certificates: any[] = [];
  try {
    certificates = await program.account.certificate.fetchMultiple(
      certificateIds
    );
  } catch (e) {
    console.log(e);
  }
  return certificates.map((c, i) => ({
    parsed: c,
    pubkey: certificateIds[i],
  }));
}

/**
 * Get all outstanding certificates serialized and sorted pertaining to this user
 * TODO this is inefficient and should be replaced with a call to an indexed set of IDs but it's okay for now
 * @param connection web3 connection
 * @param user use public key
 * @returns List of outstanding certificates pertaining to this user
 */
export async function getOutstandingCertificates(
  connection: web3.Connection,
  user: web3.PublicKey | null
){
  const coder = new anchor.BorshCoder(CERTIFICATE_IDL);
  const programAccounts = await connection.getProgramAccounts(
    CERTIFICATE_PROGRAM_ID
  );

  const outstandingCertifices: any[] = [];
  programAccounts.forEach((account) => {
    try {
      console.log(account, coder.accounts);
      // todo figure out typescript types for decoding
      const certificate = coder.accounts.decode(
        "certificate",
        account.account.data
      );
      if (
        (user && user.toBase58() === certificate.issuer.toBase58()) ||
        (user && user.toBase58() === certificate.revokeAuthority.toBase58()) ||
        certificate.state === CertificateState.Issued
      ) {
        outstandingCertifices.push({
          ...account,
          parsed: certificate,
        });
      }
    } catch (e) {
      console.log(`Failed to decode certificate ${e}`);
    }
  });

  const sortedOutstandingCertifices = outstandingCertifices.sort((a, b) =>
    a.pubkey.toBase58().localeCompare(b.pubkey.toBase58())
  );
  return sortedOutstandingCertifices;
}

/**
 * Get all invalid certificates
 * TODO this is inefficient and should be replaced with a call to an indexed set of IDs but it's okay for now
 * @param connection web3 connection
 * @returns List of invalid certificates
 */
export async function getInvalidCertificates(
  connection: web3.Connection
) {
  const coder = new anchor.BorshCoder(CERTIFICATE_IDL);
  const programAccounts = await connection.getProgramAccounts(
    CERTIFICATE_PROGRAM_ID
  );
  const invalidCertificates: any[] = [];
  programAccounts.forEach((account) => {
    try {
      // todo figure out typescript types for decoding
      const certificate = coder.accounts.decode(
        "certificate",
        account.account.data
      );
      if (
        (Math.floor(Date.now() / 1000) > certificate.expiration ||
          certificate.usages >= certificate.maxUsages) &&
        certificate.state !== CertificateState.Invalidated
      ) {
        invalidCertificates.push({
          ...account,
          parsed: certificate,
        });
      }
    } catch (e) {
      console.log(`Failed to decode certificate ${e}`);
    }
  });
  return invalidCertificates;
}
