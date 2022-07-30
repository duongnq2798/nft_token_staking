import type { AccountData } from "utils/certificates";
import type { ClaimRequestData} from "utils/namespaces";
import { getClaimRequest } from "utils/namespaces";
import type { Connection, PublicKey } from "@solana/web3.js";
import { useMemo, useState } from "react";

export const useClaimRequest = (
  connection: Connection | null,
  namespaceName: string,
  entryName: string | undefined,
  pubkey: PublicKey | undefined
) => {
  const [loadingClaimRequest, setLoadingClaimRequest] = useState<
    boolean | undefined
  >(undefined);
  const [claimRequest, setClaimRequest] = useState<
    AccountData<ClaimRequestData> | undefined
  >(undefined);

  const getClaimRequestData = async () => {
    setLoadingClaimRequest(true);
    try {
      if (!pubkey || !entryName || !connection) return;
      const data = await getClaimRequest(
        connection,
        namespaceName,
        entryName,
        pubkey
      );
      setClaimRequest(data);
    } catch (e) {
      setClaimRequest(undefined);
      console.log(`Failed to get claim request: ${e}`, e);
    } finally {
      setLoadingClaimRequest(false);
    }
  };

  useMemo(async () => {
    getClaimRequestData();
  }, [connection, namespaceName, entryName, pubkey]);

  return {
    claimRequest,
    loadingClaimRequest,
    getClaimRequestData,
  };
};
