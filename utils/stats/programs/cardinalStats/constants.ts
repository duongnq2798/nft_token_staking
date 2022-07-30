import type { AnchorTypes } from "@saberhq/anchor-contrib";
import { PublicKey } from "@solana/web3.js";

import * as STATS_TYPES from "../../idl/cardinal_stats";

export const STATS_ADDRESS = new PublicKey(
  "stQo8YUfVZG49VJ3Ewt9mzZBG3KFk9EkrBKJugc2d6J"
);

export const STATS_ENTRY_SEED = "stats-entry";

export type STATS_PROGRAM = STATS_TYPES.CardinalStats;

export const STATS_IDL = STATS_TYPES.IDL;

export type CardinalStatsTypes = AnchorTypes<STATS_PROGRAM>;

type Accounts = CardinalStatsTypes["Accounts"];
export type StatsEntryData = Accounts["statsEntry"];
