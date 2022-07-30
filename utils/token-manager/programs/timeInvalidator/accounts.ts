import {
  AnchorProvider,
  BN,
  BorshAccountsCoder,
  Program
} from "@project-serum/anchor";
import type { Connection, PublicKey } from "@solana/web3.js";
import type { Wallet } from "@saberhq/solana-contrib";
import type { AccountData } from "../../utils";
import type {
  TIME_INVALIDATOR_PROGRAM,
  TimeInvalidatorData,
} from "./constants";
import { TIME_INVALIDATOR_ADDRESS, TIME_INVALIDATOR_IDL } from "./constants";

// TODO fix types
export const getTimeInvalidator = async (
  connection: Connection,
  timeInvalidatorId: PublicKey,
  wallet: Wallet
): Promise<AccountData<TimeInvalidatorData>> => {
  // @ts-ignore
    const provider = new AnchorProvider(connection, wallet, {
    preflightCommitment: "processed",
    commitment: "confirmed",
  });;
  const timeInvalidatorProgram = new Program<TIME_INVALIDATOR_PROGRAM>(
    TIME_INVALIDATOR_IDL,
    TIME_INVALIDATOR_ADDRESS,
    provider
  );

  const parsed = await timeInvalidatorProgram.account.timeInvalidator.fetch(
    timeInvalidatorId
  );
  return {
    parsed,
    pubkey: timeInvalidatorId,
  };
};

export const getTimeInvalidators = async (
  connection: Connection,
  timeInvalidatorIds: PublicKey[],
  wallet: Wallet
): Promise<AccountData<TimeInvalidatorData>[]> => {
  // @ts-ignore
    const provider = new AnchorProvider(connection, wallet, {
    preflightCommitment: "processed",
    commitment: "confirmed",
  });;
  const timeInvalidatorProgram = new Program<TIME_INVALIDATOR_PROGRAM>(
    TIME_INVALIDATOR_IDL,
    TIME_INVALIDATOR_ADDRESS,
    provider
  );

  // @ts-ignore
  let timeInvalidators = [];
  try {
    timeInvalidators =
      await timeInvalidatorProgram.account.timeInvalidator.fetchMultiple(
        timeInvalidatorIds
      );
  } catch (e) {
    console.log(e);
  }
  // @ts-ignore
  return timeInvalidators.map((tm, i) => ({
    parsed: tm,
    pubkey: timeInvalidatorIds[i],
  }));
};

export const getExpiredTimeInvalidators = async (
  connection: Connection
): Promise<AccountData<TimeInvalidatorData>[]> => {
  const programAccounts = await connection.getProgramAccounts(
    TIME_INVALIDATOR_ADDRESS
  );

  const expiredTimeInvalidators: AccountData<TimeInvalidatorData>[] = [];
  const coder = new BorshAccountsCoder(TIME_INVALIDATOR_IDL);
  programAccounts.forEach((account) => {
    try {
      const timeInvalidatorData: TimeInvalidatorData = coder.decode(
        "timeInvalidator",
        account.account.data
      );
      if (timeInvalidatorData.expiration?.lte(new BN(Date.now() / 1000))) {
        expiredTimeInvalidators.push({
          ...account,
          parsed: timeInvalidatorData,
        });
      }
    } catch (e) {
      console.log(`Failed to decode time invalidator data`);
    }
  });
  return expiredTimeInvalidators;
};

export const getAllTimeInvalidators = async (
  connection: Connection
): Promise<AccountData<TimeInvalidatorData>[]> => {
  const programAccounts = await connection.getProgramAccounts(
    TIME_INVALIDATOR_ADDRESS
  );

  const expiredTimeInvalidators: AccountData<TimeInvalidatorData>[] = [];
  const coder = new BorshAccountsCoder(TIME_INVALIDATOR_IDL);
  programAccounts.forEach((account) => {
    try {
      const timeInvalidatorData: TimeInvalidatorData = coder.decode(
        "timeInvalidator",
        account.account.data
      );
      expiredTimeInvalidators.push({
        ...account,
        parsed: timeInvalidatorData,
      });
    } catch (e) {
      console.log(`Failed to decode time invalidator data`);
    }
  });
  return expiredTimeInvalidators;
};
