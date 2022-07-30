import type { Wallet } from "@saberhq/solana-contrib";
import type { Connection } from "@solana/web3.js";
import { Transaction } from "@solana/web3.js";

import { initStatsEntry, updateStatsEntry } from "./programs/cardinalStats";
import { findStatsEntryId } from "./programs/cardinalStats/pda";

export const withInitStatsEntry = async (
  connection: Connection,
  wallet: Wallet,
  name: string
): Promise<Transaction> => {
  const transaction = new Transaction();
  const [statsEntryId] = await findStatsEntryId(name);
  transaction.add(initStatsEntry(connection, wallet, statsEntryId, name));
  return transaction;
};

export const withUpdateStatsEntry = async (
  connection: Connection,
  wallet: Wallet,
  name: string,
  value: string
): Promise<Transaction> => {
  const transaction = new Transaction();
  const [statsEntryId] = await findStatsEntryId(name);
  transaction.add(updateStatsEntry(connection, wallet, statsEntryId, value));
  return transaction;
};
