import {
  AnchorProvider,
  BorshAccountsCoder,
  Program,
} from "@project-serum/anchor";
import type { Connection, PublicKey } from "@solana/web3.js";
import type { Wallet } from "@saberhq/solana-contrib";
import type { AccountData } from "../../utils";
import type {
  CLAIM_APPROVER_PROGRAM,
  PaidClaimApproverData,
} from "./constants";
import { CLAIM_APPROVER_ADDRESS, CLAIM_APPROVER_IDL } from "./constants";
import { findClaimApproverAddress } from "./pda";

// TODO fix types
export const getClaimApprover = async (
  connection: Connection,
  tokenManagerId: PublicKey,
  wallet: Wallet
): Promise<AccountData<PaidClaimApproverData>> => {
  // @ts-ignore
    const provider = new AnchorProvider(connection, wallet, {
    preflightCommitment: "processed",
    commitment: "confirmed",
  });;
  const claimApproverProgram = new Program<CLAIM_APPROVER_PROGRAM>(
    CLAIM_APPROVER_IDL,
    CLAIM_APPROVER_ADDRESS,
    provider
  );

  const [claimApproverId] = await findClaimApproverAddress(tokenManagerId);

  const parsed = await claimApproverProgram.account.paidClaimApprover.fetch(
    claimApproverId
  );
  return {
    // @ts-ignore
    parsed,
    pubkey: claimApproverId,
  };
};

export const getClaimApprovers = async (
  connection: Connection,
  claimApproverIds: PublicKey[],
  wallet: Wallet
): Promise<AccountData<PaidClaimApproverData>[]> => {
  // @ts-ignore
    const provider = new AnchorProvider(connection, wallet, {
    preflightCommitment: "processed",
    commitment: "confirmed",
  });;
  const claimApproverProgram = new Program<CLAIM_APPROVER_PROGRAM>(
    CLAIM_APPROVER_IDL,
    CLAIM_APPROVER_ADDRESS,
    provider
  );

  // @ts-ignore
  let claimApprovers = [];
  try {
    claimApprovers =
      await claimApproverProgram.account.paidClaimApprover.fetchMultiple(
        claimApproverIds
      );
  } catch (e) {
    console.log(e);
  }
  // @ts-ignore
  return claimApprovers.map((tm, i) => ({
    parsed: tm,
    pubkey: claimApproverIds[i],
  }));
};

export const getAllClaimApprovers = async (
  connection: Connection
): Promise<AccountData<PaidClaimApproverData>[]> => {
  const programAccounts = await connection.getProgramAccounts(
    CLAIM_APPROVER_ADDRESS
  );

  const claimApprovers: AccountData<PaidClaimApproverData>[] = [];
  const coder = new BorshAccountsCoder(CLAIM_APPROVER_IDL);
  programAccounts.forEach((account) => {
    try {
      const timeInvalidatorData: PaidClaimApproverData = coder.decode(
        "paidClaimApprover",
        account.account.data
      );
      claimApprovers.push({
        ...account,
        parsed: timeInvalidatorData,
      });
    } catch (e) {
      console.log(`Failed to decode claim approver data`);
    }
  });
  return claimApprovers;
};
