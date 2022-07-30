
import { PublicKey } from '@solana/web3.js'
import { AirdropMetadata } from 'common/Airdrop'
import { CSSProperties } from 'react'
import { ReceiptType } from 'utils/staking/programs/stakePool'

export enum TokenStandard {
  // Fungible, can have more than 1
  Fungible = 1,
  // Non fungible are all unique
  NonFungible = 2,
}

export type StakePoolMetadata = {
  // Name of this stake pool used as an id. Should be in lower-case kebab-case since it is used in the URL as /{name}
  // https://www.theserverside.com/blog/Coffee-Talk-Java-News-Stories-and-Opinions/Why-you-should-make-kebab-case-a-URL-naming-convention-best-practice
  name: string
  // Display name to be displayed in the header. Often the same as name but with capital letters and spaces
  displayName: string
  // Publickey for this stake pool
  stakePoolAddress: PublicKey
  // Default receipt type. Setting this will remove the option for the user to choose which receipt type to use
  receiptType?: ReceiptType
  // Default empty. Setting this will tell the UI to only show tokens of that standard. Supports fungible or non-fungible
  tokenStandard?: TokenStandard
  // Optional config to hide this pool from the main page
  hidden?: boolean
  // Optional config to disable finding this pool
  notFound?: boolean
  // Optional hostname to remap
  hostname?: string
  // Optional config to link redirect to page when you click on this pool
  redirect?: string
  // Hide allowed tokens style
  hideAllowedTokens?: boolean
  // styles to apply to the whole stake pool
  styles?: CSSProperties
  // Colors object to style the stake page
  colors?: {
    primary: string
    secondary: string
    accent?: string
    fontColor?: string
    fontColorSecondary?: string
    backgroundSecondary?: string
  }
  // Image url to be used as the icon in the pool selector and the header
  imageUrl?: string
  // Background banner image for pool
  backgroundBannerImageUrl?: string
  // Website url if specified will be navigated to when the image in the header is clicked
  websiteUrl?: string
  // Max staked is used to compute percentage of total staked
  maxStaked?: number
  // Links to show at the top right of the page
  links?: { text: string; value: string }[]
  // On devnet when you click the airdrop button on this page it will clone NFTs with this metadata and airdrop to the user
  airdrops?: AirdropMetadata[]
}

export const defaultSecondaryColor = 'rgba(29, 78, 216, 255)'

export const stakePoolMetadatas: StakePoolMetadata[] = [
  {
    name: 'VNT Staking',
    displayName: 'VNT Staking',
    stakePoolAddress: new PublicKey(
      'HjkR5ajxatPDDNPqjWv2nug2LatVN9yd4bXPpC4rBwgU'
    ),
    websiteUrl: 'https://VNTStaking/nft-staking-v2',
    imageUrl:
      'https://blockasset.co/static/logo-e51ac9985ba7aef4ac8c1b1ae1c00511.png',
    colors: {
      primary: '#000000',
      secondary: '#4da1de',
      accent: '#1fcfb11c',
      fontColor: '#FFFFFF',
    },
    airdrops: [
      {
        name: 'VNT Stakin',
        symbol: 'LEGENDS',
        uri: 'https://arweave.net/Q5y8_OehSOYCkGiX-hV1H6qiczoDaVdk4Eyi4lhhdQE',
      },
    ],
  },

]
