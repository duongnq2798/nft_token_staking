// import { Wallet } from "@project-serum/anchor";
import { useWallet, WalletContextState } from "@solana/wallet-adapter-react";
import { useEffect } from "react";


export const useAccountChange = () => {
    const wallet: any = useWallet()

    // useEffect(() => {
    //     if (typeof window !== undefined && wallet && wallet?.wallet?.adapter && wallet?.wallet.adapter.publicKey) {
    //         setInterval(function () {
    //             if (window.solana.publicKey?.toBase58() !== wallet?.wallet?.adapter.publicKey?.toBase58()) {
    //                 wallet?.wallet?.adapter.disconnect()
    //             }
    //         }, 1000);
    //     }
    // }, [wallet && wallet?.wallet?.adapter.publicKey])

    return wallet as any;
}