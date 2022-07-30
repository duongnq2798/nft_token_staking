import type { AccountData } from "utils/certificates";
import type { ReverseEntryData } from "utils/namespaces";
import { getReverseEntry } from "utils/namespaces";
import type { Connection, PublicKey } from "@solana/web3.js";
import { useMemo, useState } from "react";

export const useReverseEntry = (
  connection: Connection | null,
  pubkey: PublicKey | undefined
) => {
  const [loading, setLoading] = useState<boolean | undefined>(undefined);
  const [reverseEntryData, setReverseEntry] = useState<
    AccountData<ReverseEntryData> | undefined
  >(undefined);

  const getReverseEntryData = async () => {
    setLoading(true);
    try {
      if (!pubkey || !connection) return;
      const data = await getReverseEntry(connection, pubkey);
      setReverseEntry(data);
    } catch (e) {
      setReverseEntry(undefined);
      console.log(`Failed to get claim request: ${e}`, e);
    } finally {
      setLoading(false);
    }
  };

  useMemo(async () => {
    getReverseEntryData();
  }, [connection, pubkey]);

  return {
    reverseEntryData,
    getReverseEntryData,
    loading,
  };
};
