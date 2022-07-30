// import type { Wallet } from "@saberhq/solana-contrib";
// import type { WalletContextState } from "@solana/wallet-adapter-react";
import * as web3 from "@solana/web3.js";

/**
 * Wrap WalletContextState interface into Wallet interface
 * @param wallet
 * @returns
 */
// export const asWallet = (wallet: WalletContextState): Wallet => {
//   return wallet as Wallet;
// };

const networkURLs: { [s: string]: string } = {
  ["mainnet-beta"]: "https://ssc-dao.genesysgo.net/",
  mainnet: "https://ssc-dao.genesysgo.net/",
  devnet: "https://psytrbhymqlkfrhudd.dev.genesysgo.net:8899/",
  testnet: "https://api.testnet.solana.com/",
  localnet: "http://localhost:8899/",
};

/**
 * Create and return new Connection object
 * @param cluster
 * @param defaultCluster
 * @returns
 */
export const connectionFor = (
  cluster: string | null,
  defaultCluster = "mainnet"
): web3.Connection => {
  return new web3.Connection(
    process.env.RPC_URL || (networkURLs[cluster || defaultCluster] as string),
    "recent"
  );
};
