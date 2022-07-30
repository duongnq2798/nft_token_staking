import { AnchorProvider, Program } from "@project-serum/anchor";
import type { Connection } from "@solana/web3.js";
import { AccountData } from "utils/common";
import type { Wallet } from "@saberhq/solana-contrib";
import type { STATS_PROGRAM, StatsEntryData } from "./constants";
import { STATS_ADDRESS, STATS_IDL } from "./constants";
import { findStatsEntryId } from "./pda";

export const getStatsEntry = async (
  connection: Connection,
  name: string,
  wallet: Wallet
): Promise<AccountData<StatsEntryData>> => {
  // @ts-ignore
    const provider = new AnchorProvider(connection, wallet, {
    preflightCommitment: "processed",
    commitment: "confirmed",
  });;
  const statsProgram = new Program<STATS_PROGRAM>(
    STATS_IDL,
    STATS_ADDRESS,
    provider
  );

  const [statsEntryId] = await findStatsEntryId(name);
  const parsed = await statsProgram.account.statsEntry.fetch(statsEntryId);
  return {
    parsed,
    pubkey: statsEntryId,
  };
};
