export interface NftCountsType {
  buynow: number;
  activeOffer: number;
  auction: number;
}

export interface NFTCardType {
  saleType?: string;
  name?: string;
  price?: string;
  image?: string;
  endedAt?: string;
  owner?: string;
  tokenId?: string;
  ftId?: string;
  collectionId?: string;
  ar?: string;
  vr?: string;
}

export interface CollectionType {
  collectionLogo?: string;
  collectionName?: string;
  collectionId?: string;
}
export interface ExploreNFTType {
  nft?: NFTCardType;
  collection?: CollectionType;
}
