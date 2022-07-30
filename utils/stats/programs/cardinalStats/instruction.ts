import { AnchorProvider, Program } from "@project-serum/anchor";
import type { Wallet } from "@saberhq/solana-contrib";
import * as web3 from "@solana/web3.js";

import type { STATS_PROGRAM } from "./constants";
import { STATS_ADDRESS, STATS_IDL } from "./constants";

export const initStatsEntry = (
  connection: web3.Connection,
  wallet: Wallet,
  statsEntryId: web3.PublicKey,
  name: string
): web3.TransactionInstruction => {
  const provider = new AnchorProvider(connection, wallet, {});
  const statsProgram = new Program<STATS_PROGRAM>(
    STATS_IDL,
    STATS_ADDRESS,
    provider
  );
  return statsProgram.instruction.initStatsEntry(
    {
      name: name,
    },
    {
      accounts: {
        statsEntry: statsEntryId,
        authority: wallet.publicKey,
        systemProgram: web3.SystemProgram.programId,
      },
    }
  );
};

export const updateStatsEntry = (
  connection: web3.Connection,
  wallet: Wallet,
  statsEntryId: web3.PublicKey,
  value: string
): web3.TransactionInstruction => {
  const provider = new AnchorProvider(connection, wallet, {});
  const statsProgram = new Program<STATS_PROGRAM>(
    STATS_IDL,
    STATS_ADDRESS,
    provider
  );
  return statsProgram.instruction.updateStatsEntry(value, {
    accounts: {
      statsEntry: statsEntryId,
      authority: wallet.publicKey,
    },
  });
};
