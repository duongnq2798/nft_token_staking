export interface IStakeCard {
    src: string
    title: string
    content: string
    status: string
    loading: boolean[]
    onClick?: () => void
    handleClaimRewards?: () => void
  }
  