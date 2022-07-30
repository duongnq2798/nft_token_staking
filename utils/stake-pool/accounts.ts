import * as web3 from "@solana/web3.js";
import { STAKE_POOL_PROGRAM_ID } from "./constants";
import {
  BorshAccountsCoder,
  Program,
  AnchorProvider,
  utils,
} from "@project-serum/anchor";
import {
  AccountData,
  StakeEntryData,
  STAKER_OFFSET,
  STAKE_POOL_IDL,
  STAKE_POOL_PROGRAM,
} from "./constants";
import { GROUP_ENTRY_SEED, STAKE_ENTRY_SEED } from ".";

export async function getStakeEntry(
  connection: web3.Connection,
  originalMint: web3.PublicKey
): Promise<AccountData<StakeEntryData>> {
  const provider = new AnchorProvider(connection, null as any, {});
  const stakePool = new Program(
    STAKE_POOL_IDL,
    STAKE_POOL_PROGRAM_ID,
    provider
  );

  const [stakeEntryId] = await web3.PublicKey.findProgramAddress(
    [utils.bytes.utf8.encode(STAKE_ENTRY_SEED), originalMint.toBytes()],
    stakePool.programId
  );

  const parsed = await stakePool.account.stakeEntry.fetch(stakeEntryId);
  return {
    parsed,
    pubkey: stakeEntryId,
  };
}

export const getStakeEntries = async (
  connection: web3.Connection,
  stakeEntryIds: web3.PublicKey[]
): Promise<AccountData<StakeEntryData>[] | any> => {
  const provider = new AnchorProvider(connection, null as any, {});
  const stakePoolProgram = new Program<STAKE_POOL_PROGRAM>(
    STAKE_POOL_IDL,
    STAKE_POOL_PROGRAM_ID,
    provider
  );

  let stakeEntries: any[] = [];
  try {
    stakeEntries = await stakePoolProgram.account.stakeEntry.fetchMultiple(
      stakeEntryIds
    );
  } catch (e) {
    console.log(e);
  }
  return stakeEntries.map((tm, i) => ({
    parsed: tm,
    pubkey: stakeEntryIds[i],
  }));
};

export const getAllStakeEntries = async (
  connection: web3.Connection,
  user?: web3.PublicKey | null
): Promise<AccountData<StakeEntryData>[]> => {
  const programAccounts = await connection.getProgramAccounts(
    STAKE_POOL_PROGRAM_ID,
    user
      ? {
          filters: [
            { memcmp: { offset: STAKER_OFFSET, bytes: user.toBase58() } },
          ],
        }
      : {}
  );
  const stakeEntryDatas: AccountData<StakeEntryData>[] = [];
  const coder = new BorshAccountsCoder(STAKE_POOL_IDL);
  programAccounts.forEach((account) => {
    try {
      const stakeEntryData: StakeEntryData = coder.decode(
        "stakeEntry",
        account.account.data
      );
      if (
        stakeEntryData &&
        stakeEntryData.lastStaker.toString() !=
          web3.PublicKey.default.toBase58()
      ) {
        stakeEntryDatas.push({
          ...account,
          parsed: stakeEntryData,
        });
      }
    } catch (e) {
      // console.log(`Failed to decode token manager data`);
    }
  });

  return stakeEntryDatas.sort((a, b) =>
    a.pubkey.toBase58().localeCompare(b.pubkey.toBase58())
  );
};

export const getStakeEntriesForUser = async (
  connection: web3.Connection,
  user: web3.PublicKey
): Promise<AccountData<StakeEntryData>[]> => {
  const programAccounts = await connection.getProgramAccounts(
    STAKE_POOL_PROGRAM_ID,
    {
      filters: [{ memcmp: { offset: STAKER_OFFSET, bytes: user.toBase58() } }],
    }
  );

  const stakeEntryDatas: AccountData<StakeEntryData>[] = [];
  const coder = new BorshAccountsCoder(STAKE_POOL_IDL);
  programAccounts.forEach((account) => {
    try {
      const stakeEntryData: StakeEntryData = coder.decode(
        "stakeEntry",
        account.account.data
      );
      if (stakeEntryData) {
        stakeEntryDatas.push({
          ...account,
          parsed: stakeEntryData,
        });
      }
    } catch (e) {
      // console.log(`Failed to decode token manager data`);
    }
  });

  return stakeEntryDatas.sort((a, b) =>
    a.pubkey.toBase58().localeCompare(b.pubkey.toBase58())
  );
};

export async function getGroupStakeEntry(
  connection: web3.Connection,
  stakeEntryOne: web3.PublicKey,
  stakeEntryTwo: web3.PublicKey,
  stakeEntryThree: web3.PublicKey,
  stakeEntryFour: web3.PublicKey
) {
  const provider = new AnchorProvider(connection, null as any, {});
  const stakePool = new Program(
    STAKE_POOL_IDL,
    STAKE_POOL_PROGRAM_ID,
    provider
  );

  const [groupStakeEntryId] = await web3.PublicKey.findProgramAddress(
    [
      utils.bytes.utf8.encode(GROUP_ENTRY_SEED),
      stakeEntryOne.toBytes(),
      stakeEntryTwo.toBytes(),
      stakeEntryThree.toBytes(),
      stakeEntryFour.toBytes(),
    ],
    stakePool.programId
  );

  const parsed = await stakePool.account.groupStakeEntry.fetch(
    groupStakeEntryId
  );
  return {
    parsed,
    pubkey: groupStakeEntryId,
  };
}
