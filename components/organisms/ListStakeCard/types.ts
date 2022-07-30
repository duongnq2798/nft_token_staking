import { AllowedTokenData, StakeEntryTokenData } from "hooks";

export interface IListStakeCard {
    loading: boolean[];
    currentTkAddress: AllowedTokenData | StakeEntryTokenData | any;
    datas: AllowedTokenData[] | StakeEntryTokenData[] | any[]
    handleStake: (tk: any) => void
    handleUnstake: (tk: any) => void
    handleClaimRewards: (tk: any) => void
    selectStakedToken: (item: any) => void
    selectUnstakedToken: (item: any) => void
  }
  