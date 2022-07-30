import type { Connection,PublicKey } from "@solana/web3.js";
import { useMemo, useState } from "react";

import { tryGetImageUrl } from "../utils/format";
import { useAddressName } from "./useAddressName";

export const useAddressImage = (
  connection: Connection,
  address: PublicKey | undefined,
  dev?: boolean
): { addressImage: string | undefined; loadingImage: boolean } => {
  const [addressImage, setAddressImage] = useState<string | undefined>(
    undefined
  );
  const [loadingImage, setLoadingImage] = useState<boolean>(true);
  const { displayName, loadingName } = useAddressName(connection, address);

  // const refreshImage = async (displayName: string | undefined) => {
  //   try {
  //     setLoadingImage(true);
  //     const [_namespace, handle] = displayName ? breakName(displayName) : [];
  //     if (handle) {
  //       const imageUrl = await tryGetImageUrl(handle, dev);
  //       setAddressImage(imageUrl);
  //     } else {
  //       setAddressImage(undefined);
  //     }
  //   } finally {
  //     setLoadingImage(false);
  //   }
  // };

  // useMemo(() => {
  //   void refreshImage(displayName);
  // }, [displayName]);
  return { addressImage, loadingImage: loadingImage || loadingName };
};
