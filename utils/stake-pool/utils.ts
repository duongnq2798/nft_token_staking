import * as web3 from "@solana/web3.js";
import { BN } from "@project-serum/anchor";
import * as splToken from "@solana/spl-token";
import { AccountData, StakeEntryData } from "./constants";
import { getStakeEntries } from ".";

export const createMint = async (
  connection: web3.Connection,
  creator: web3.Keypair,
  recipient: web3.PublicKey,
  amount = 1
): Promise<[web3.PublicKey, splToken.Token]> => {
  const fromAirdropSignature = await connection.requestAirdrop(
    creator.publicKey,
    web3.LAMPORTS_PER_SOL
  );
  await connection.confirmTransaction(fromAirdropSignature);
  const mint = await splToken.Token.createMint(
    connection,
    creator,
    creator.publicKey,
    creator.publicKey,
    1,
    splToken.TOKEN_PROGRAM_ID
  );
  const tokenAccount = await mint.createAssociatedTokenAccount(recipient);
  await mint.mintTo(tokenAccount, creator.publicKey, [], amount);
  return [tokenAccount, mint];
};

export async function withFindOrInitAssociatedTokenAccount(
  transaction: web3.Transaction,
  connection: web3.Connection,
  mint: web3.PublicKey,
  owner: web3.PublicKey,
  payer: web3.PublicKey,
  allowOwnerOffCurve?: boolean
): Promise<web3.PublicKey> {
  const associatedAddress = await splToken.Token.getAssociatedTokenAddress(
    splToken.ASSOCIATED_TOKEN_PROGRAM_ID,
    splToken.TOKEN_PROGRAM_ID,
    mint,
    owner,
    allowOwnerOffCurve
  );
  const account = await connection.getAccountInfo(associatedAddress);
  if (!account) {
    transaction.add(
      splToken.Token.createAssociatedTokenAccountInstruction(
        splToken.ASSOCIATED_TOKEN_PROGRAM_ID,
        splToken.TOKEN_PROGRAM_ID,
        mint,
        associatedAddress,
        owner,
        payer
      )
    );
  }
  return associatedAddress;
}

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
    if (i >= TIER_2_LEVEL) {
      multiplier = LEVEL_11_17_PCT;
    }
    if (i >= TIER_3_LEVEL) {
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
  for (let i = 0; i <= 25; i++) {
    if (totalStakeSeconds < Math.floor(requiredSeconds)) {
      return [i, requiredSeconds];
    }
    let multiplier = LEVEL_1_10_PCT;
    if (i + 1 >= TIER_2_LEVEL) {
      multiplier = LEVEL_11_17_PCT;
    }
    if (i + 1 >= TIER_3_LEVEL) {
      multiplier = LEVEL_18_25_PCT;
    }
    difference = difference * multiplier;
    requiredSeconds += difference;
  }
  return [25, requiredSeconds];
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

/**
 * Gets the level number of a jambo based on its original mint id
 * @param totalStakeSeconds
 * @returns
 */
export const getJamboLevel = async (
  connection: web3.Connection,
  mintIds: web3.PublicKey[]
): Promise<[number, number][]> => {
  let stakeEntries = await getStakeEntries(connection, mintIds);
  return stakeEntries.map((entry: any) =>
    getLevelNumber(entry.parsed.totalStakeSeconds?.toNumber())
  );
};
