import { IdlTypes, web3, IdlAccounts } from "@project-serum/anchor";
import { TypeDef } from "@project-serum/anchor/dist/cjs/program/namespace/types";
import { Namespaces } from "./idl";

export type AccountData<T> = {
  pubkey: web3.PublicKey;
  parsed: T;
};

export type GlobalContextData = TypeDef<
  Namespaces["accounts"][0],
  IdlTypes<Namespaces>
>;

export type NamespaceData = TypeDef<
  Namespaces["accounts"][1],
  IdlTypes<Namespaces>
>;

export type ClaimRequestData = TypeDef<
  Namespaces["accounts"][2],
  IdlTypes<Namespaces>
>;

export type EntryData = TypeDef<
  Namespaces["accounts"][3],
  IdlTypes<Namespaces>
>;

export type ReverseEntryData = TypeDef<
  Namespaces["accounts"][4],
  IdlTypes<Namespaces>
>;
