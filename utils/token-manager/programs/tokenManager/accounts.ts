import {
  AnchorProvider,
  BN,
  BorshAccountsCoder,
  Program,
  utils,
} from "@project-serum/anchor";
import type { Connection, PublicKey } from "@solana/web3.js";

import type { AccountData } from "../../utils";
import type { TokenManagerState } from ".";
import type {
  MintCounterData,
  MintManagerData,
  TOKEN_MANAGER_PROGRAM,
  TokenManagerData,
} from "./constants";
import { TOKEN_MANAGER_ADDRESS, TOKEN_MANAGER_IDL } from "./constants";
import { Wallet } from "@metaplex/js";

export const getTokenManager = async (
  connection: Connection,
  tokenManagerId: PublicKey,
  wallet: Wallet
): Promise<AccountData<TokenManagerData>> => {
  // @ts-ignore
    const provider = new AnchorProvider(connection, wallet, {
    preflightCommitment: "processed",
    commitment: "confirmed",
  });;
  const tokenManagerProgram = new Program<TOKEN_MANAGER_PROGRAM>(
    TOKEN_MANAGER_IDL,
    TOKEN_MANAGER_ADDRESS,
    provider
  );

  const parsed = await tokenManagerProgram.account.tokenManager.fetch(
    tokenManagerId
  );
  return {
    parsed,
    pubkey: tokenManagerId,
  };
};

export const getTokenManagers = async (
  connection: Connection,
  tokenManagerIds: PublicKey[],
  wallet: Wallet
): Promise<AccountData<TokenManagerData>[]> => {
  // @ts-ignore
    const provider = new AnchorProvider(connection, wallet, {
    preflightCommitment: "processed",
    commitment: "confirmed",
  });;
  const tokenManagerProgram = new Program<TOKEN_MANAGER_PROGRAM>(
    TOKEN_MANAGER_IDL,
    TOKEN_MANAGER_ADDRESS,
    provider
  );

  // @ts-ignore
  let tokenManagers = [];
  try {
    tokenManagers =
      await tokenManagerProgram.account.tokenManager.fetchMultiple(
        tokenManagerIds
      );
  } catch (e) {
    console.log(e);
  }
  // @ts-ignore
  return tokenManagers.map((tm, i) => ({
    parsed: tm,
    pubkey: tokenManagerIds[i],
  }));
};

export const getTokenManagersByState = async (
  connection: Connection,
  state: TokenManagerState | null
): Promise<AccountData<TokenManagerData>[]> => {
  const programAccounts = await connection.getProgramAccounts(
    TOKEN_MANAGER_ADDRESS,
    {
      filters: state
        ? [
            {
              memcmp: {
                offset: 92,
                bytes: utils.bytes.bs58.encode(
                  new BN(state).toArrayLike(Buffer, "le", 1)
                ),
              },
            },
          ]
        : [],
    }
  );

  const tokenManagerDatas: AccountData<TokenManagerData>[] = [];
  const coder = new BorshAccountsCoder(TOKEN_MANAGER_IDL);
  programAccounts.forEach((account) => {
    try {
      const tokenManagerData: TokenManagerData = coder.decode(
        "tokenManager",
        account.account.data
      );
      if (tokenManagerData) {
        tokenManagerDatas.push({
          ...account,
          parsed: tokenManagerData,
        });
      }
    } catch (e) {
      console.log(`Failed to decode token manager data`);
    }
  });

  return tokenManagerDatas.sort((a, b) =>
    a.pubkey.toBase58().localeCompare(b.pubkey.toBase58())
  );
};

export const getMintManager = async (
  connection: Connection,
  mintManagerId: PublicKey,
  wallet: Wallet
): Promise<AccountData<MintManagerData>> => {
  // @ts-ignore
    const provider = new AnchorProvider(connection, wallet, {
    preflightCommitment: "processed",
    commitment: "confirmed",
  });;
  const tokenManagerProgram = new Program<TOKEN_MANAGER_PROGRAM>(
    TOKEN_MANAGER_IDL,
    TOKEN_MANAGER_ADDRESS,
    provider
  );

  const parsed = await tokenManagerProgram.account.mintManager.fetch(
    mintManagerId
  );
  return {
    parsed,
    pubkey: mintManagerId,
  };
};

export const getMintCounter = async (
  connection: Connection,
  mintCounterId: PublicKey,
  wallet: Wallet
): Promise<AccountData<MintCounterData>> => {
  // @ts-ignore
    const provider = new AnchorProvider(connection, wallet, {
    preflightCommitment: "processed",
    commitment: "confirmed",
  });;
  const tokenManagerProgram = new Program<TOKEN_MANAGER_PROGRAM>(
    TOKEN_MANAGER_IDL,
    TOKEN_MANAGER_ADDRESS,
    provider
  );

  const parsed = await tokenManagerProgram.account.mintCounter.fetch(
    mintCounterId
  );
  return {
    parsed,
    pubkey: mintCounterId,
  };
};

export const getTokenManagersForIssuer = async (
  connection: Connection,
  issuerId: PublicKey
): Promise<AccountData<TokenManagerData>[]> => {
  const programAccounts = await connection.getProgramAccounts(
    TOKEN_MANAGER_ADDRESS,
    {
      filters: [{ memcmp: { offset: 19, bytes: issuerId.toBase58() } }],
    }
  );

  const tokenManagerDatas: AccountData<TokenManagerData>[] = [];
  const coder = new BorshAccountsCoder(TOKEN_MANAGER_IDL);
  programAccounts.forEach((account) => {
    try {
      const tokenManagerData: TokenManagerData = coder.decode(
        "tokenManager",
        account.account.data
      );
      if (tokenManagerData) {
        tokenManagerDatas.push({
          ...account,
          parsed: tokenManagerData,
        });
      }
    } catch (e) {
      console.log(`Failed to decode token manager data`);
    }
  });

  return tokenManagerDatas.sort((a, b) =>
    a.pubkey.toBase58().localeCompare(b.pubkey.toBase58())
  );
};
