import type { AnchorTypes } from "@saberhq/anchor-contrib";

import * as STAKE_POOL_TYPES from "./idl/stake_pool";
import { PublicKey } from "@solana/web3.js";

export const CRANK_PUB_KEY = new PublicKey(
  "crkdpVWjHWdggGgBuSyAqSmZUmAjYLzD435tcLDRLXr"
);

export const STAKE_POOL_PROGRAM_ID = new PublicKey(
  "DQ19LrFZbnj8VqykrGAURvjJ5mo4LYRk8myoYCbaCKvT"
);

export const STAKE_ENTRY_SEED = "stake-entry";

export const GROUP_ENTRY_SEED = "group-stake-entry";

export const STAKER_OFFSET = 97;

export const STAKE_POOL_IDL = STAKE_POOL_TYPES.IDL;

export type STAKE_POOL_PROGRAM = STAKE_POOL_TYPES.StakePool;

export type StakePoolTypes = AnchorTypes<
  STAKE_POOL_PROGRAM,
  {
    stakeEntry: StakeEntryData;
  }
>;

export type TokenManagerError = StakePoolTypes["Error"];

type Accounts = StakePoolTypes["Accounts"];
export type StakeEntryData = Accounts["stakeEntry"];

export type AccountData<T> = {
  pubkey: PublicKey;
  parsed: T;
};
