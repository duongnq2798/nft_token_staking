import { PublicKey } from "@solana/web3.js";

const NEXT_PUBLIC_STAKE_POOL_TOKEN_ID = new PublicKey(process.env.NEXT_PUBLIC_STAKE_POOL_TOKEN_ID || '');
const NEXT_PUBLIC_STAKE_POOL_NFT_ID = new PublicKey(process.env.NEXT_PUBLIC_STAKE_POOL_NFT_ID || '');

/* Defining a constant called NFTStatus that is an object with two properties: UNSTAKE and STAKED. */
const NFTStatus = {
    UNSTAKE: 'unstake',
    STAKED: 'staked',
}

export {
    NEXT_PUBLIC_STAKE_POOL_TOKEN_ID,
    NEXT_PUBLIC_STAKE_POOL_NFT_ID,
    NFTStatus
}