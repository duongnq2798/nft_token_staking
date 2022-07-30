import { Wallet } from "@metaplex/js";
import { AnchorProvider, Program } from "@project-serum/anchor";
import type { Connection, PublicKey } from "@solana/web3.js";

import type { AccountData } from "../../utils";
import type { USE_INVALIDATOR_PROGRAM, UseInvalidatorData } from "./constants";
import { USE_INVALIDATOR_ADDRESS, USE_INVALIDATOR_IDL } from "./constants";

// TODO fix types
export const getUseInvalidator = async (
  connection: Connection,
  useInvalidatorId: PublicKey,
  wallet: Wallet
): Promise<AccountData<UseInvalidatorData>> => {
  // @ts-ignore
    const provider = new AnchorProvider(connection, wallet, {
    preflightCommitment: "processed",
    commitment: "confirmed",
  });;
  const useInvalidatorProgram = new Program<USE_INVALIDATOR_PROGRAM>(
    USE_INVALIDATOR_IDL,
    USE_INVALIDATOR_ADDRESS,
    provider
  );

  const parsed = await useInvalidatorProgram.account.useInvalidator.fetch(
    useInvalidatorId
  );
  return {
    // @ts-ignore
    parsed,
    pubkey: useInvalidatorId,
  };
};

export const getUseInvalidators = async (
  connection: Connection,
  useInvalidatorIds: PublicKey[],
  wallet: Wallet
): Promise<AccountData<UseInvalidatorData>[]> => {
  // @ts-ignore
    const provider = new AnchorProvider(connection, wallet, {
    preflightCommitment: "processed",
    commitment: "confirmed",
  });;
  const useInvalidatorProgram = new Program<USE_INVALIDATOR_PROGRAM>(
    USE_INVALIDATOR_IDL,
    USE_INVALIDATOR_ADDRESS,
    provider
  );

  // @ts-ignore
  let useInvalidators = [];
  try {
    useInvalidators =
      await useInvalidatorProgram.account.useInvalidator.fetchMultiple(
        useInvalidatorIds
      );
  } catch (e) {
    console.log(e);
  }
  // @ts-ignore
  return useInvalidators.map((tm, i) => ({
    parsed: tm,
    pubkey: useInvalidatorIds[i],
  }));
};
