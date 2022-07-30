import type {
  AccountData,
  CertificateData} from "utils/certificates";
import {
  certificateIdForMint,
  getCertificate,
} from "utils/certificates";
import type {
  EntryData} from "utils/namespaces";
import {
  getNameEntry,
  NAMESPACES_PROGRAM_ID,
} from "utils/namespaces";
import * as metaplex from "@metaplex/js";
import * as anchor from "@project-serum/anchor";
import * as splToken from "@solana/spl-token";
import type {
  Connection,
  TokenAccountBalancePair} from "@solana/web3.js";
import {
  PublicKey
} from "@solana/web3.js";
import { useMemo, useState } from "react";

export type NameEntryData = {
  nameEntry: AccountData<EntryData>;
  certificate: AccountData<CertificateData> | any;
  metaplexData: any;
  arweaveData: { pubkey: PublicKey; parsed: any };
  largestHolders: TokenAccountBalancePair[];
  owner: PublicKey | undefined;
  isOwnerPDA: boolean;
};

export async function getNameEntryData(
  connection: Connection,
  namespaceName: string,
  entryName: string
): Promise<NameEntryData> {
  const nameEntry = await getNameEntry(connection, namespaceName, entryName);
  const { mint } = nameEntry.parsed;

  const [[metaplexId], [certificateId]] = await Promise.all([
    PublicKey.findProgramAddress(
      [
        anchor.utils.bytes.utf8.encode(
          metaplex.programs.metadata.MetadataProgram.PREFIX
        ),
        metaplex.programs.metadata.MetadataProgram.PUBKEY.toBuffer(),
        mint.toBuffer(),
      ],
      metaplex.programs.metadata.MetadataProgram.PUBKEY
    ),
    certificateIdForMint(mint),
  ]);
  const [metaplexData, certificate] = await Promise.all([
    metaplex.programs.metadata.Metadata.load(connection, metaplexId),
    getCertificate(connection, certificateId),
  ]);
  let json;
  try {
    json =
      metaplexData.data.data.uri &&
      (await fetch(metaplexData.data.data.uri).then((r) => r.json()));
  } catch (e) {
    console.log("Failed to get json", json);
  }

  const largestHolders = await connection.getTokenLargestAccounts(mint);
  const certificateMintToken = new splToken.Token(
    connection,
    mint,
    splToken.TOKEN_PROGRAM_ID,
    // not used
    anchor.web3.Keypair.generate()
  );

  const largestTokenAccount =
    largestHolders?.value[0]?.address &&
    (await certificateMintToken.getAccountInfo(
      largestHolders?.value[0]?.address
    ));

  let isOwnerPDA = false;
  if (largestTokenAccount?.owner) {
    const ownerAccountInfo = await connection.getAccountInfo(
      largestTokenAccount?.owner
    );
    isOwnerPDA =
      ownerAccountInfo?.owner.toString() === NAMESPACES_PROGRAM_ID.toString();
  }

  return {
    nameEntry,
    certificate,
    metaplexData,
    arweaveData: { pubkey: metaplexId, parsed: json },
    largestHolders: largestHolders.value,
    owner: largestTokenAccount?.owner,
    isOwnerPDA,
  };
}

export const useNameEntryData = (
  connection: Connection | null,
  namespaceName: string,
  entryName: string | undefined
) => {
  const [loadingNameEntry, setLoadingNameEntry] = useState<boolean | undefined>(
    undefined
  );
  const [nameEntryData, setNameEntryData] = useState<NameEntryData | undefined>(
    undefined
  );

  const refreshNameEntryData = async () => {
    if (!entryName || !connection) return;
    setLoadingNameEntry(true);
    try {
      const data = await getNameEntryData(connection, namespaceName, entryName);
      setNameEntryData(data);
    } catch (e) {
      setNameEntryData(undefined);
      console.log("Failed to get name entry: ", e);
    } finally {
      setLoadingNameEntry(false);
    }
  };

  useMemo(async () => {
    refreshNameEntryData();
  }, [connection, namespaceName, entryName]);

  return {
    nameEntryData,
    refreshNameEntryData,
    loadingNameEntry,
  };
};
