// import type { AccountData, StakeEntryData } from "@cardinal/stake-pool";
import { BN } from "@project-serum/anchor";
import * as web3 from "@solana/web3.js";
import { AccountData, StakeEntryData } from "utils/stake-pool";

const LEVEL_1_10_PCT = 1.4;
const TIER_2_LEVEL = 10;
const LEVEL_11_17_PCT = 1.25;
const TIER_3_LEVEL = 17;
const LEVEL_18_25_PCT = 1.15;
export const GROUP_AND_HUNGRY_THRESHOLD = 10000;

/**
 * Calculates the total number of seconds a jambo has been
 * staked on the level up pool given its level number
 * @param level
 * @returns
 */
export const secondsFromLevel = (level: number | undefined): number => {
  if (!level) return 0;
  let requiredSeconds = 4 * 60 * 60;
  let difference = requiredSeconds;
  for (let i = 1; i < level; i++) {
    let multiplier = LEVEL_1_10_PCT;
    if (i > TIER_2_LEVEL) {
      multiplier = LEVEL_11_17_PCT;
    }
    if (i > TIER_3_LEVEL) {
      multiplier = LEVEL_18_25_PCT;
    }
    difference = difference * multiplier;
    requiredSeconds += difference;
  }
  return requiredSeconds;
};

/**
 * Calculate actual level of jambo given the total seconds
 * it has been staked on the level up pool
 * @param totalStakeSeconds
 * @returns
 */
export const getLevelNumber = (
  totalStakeSeconds: number | undefined
): [number, number] => {
  let requiredSeconds = 4 * 60 * 60;
  let difference = requiredSeconds;
  if (!totalStakeSeconds) return [0, requiredSeconds];
  const level = 0;
  for (let i = 0; i <= 25; i++) {
    if (totalStakeSeconds < Math.floor(requiredSeconds)) {
      return [i, requiredSeconds];
    }
    let multiplier = LEVEL_1_10_PCT;
    if (i >= TIER_2_LEVEL) {
      multiplier = LEVEL_11_17_PCT;
    }
    if (i >= TIER_3_LEVEL) {
      multiplier = LEVEL_18_25_PCT;
    }

    difference = difference * multiplier;
    requiredSeconds += difference;
  }
  return [level, requiredSeconds];
};

/**
 * Gets the number of active stake seconds
 * on the level up pool given a stake entry
 * @param stakeEntryData
 * @param UTCNow
 * @returns
 */
export function getActiveStakeSeconds(
  stakeEntryData: AccountData<StakeEntryData> | null | undefined,
  UTCNow: number
): number {
  const lastStakedAt = stakeEntryData?.parsed.lastStakedAt.toNumber() || UTCNow;
  const stakeBoost = (
    stakeEntryData?.parsed.stakeBoost || new BN(1)
  ).toNumber();
  const totalStakeSeconds = (
    stakeEntryData?.parsed.totalStakeSeconds || new BN(0)
  ).toNumber();
  const stakedTime =
    stakeEntryData?.parsed.lastStaker.toString() !==
    web3.PublicKey.default.toString()
      ? totalStakeSeconds +
        (stakeBoost /
          (stakeBoost >= GROUP_AND_HUNGRY_THRESHOLD ? 10000 : 100)) *
          (UTCNow - lastStakedAt)
      : totalStakeSeconds;

  return stakedTime;
}
