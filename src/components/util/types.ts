/* eslint-disable camelcase */
export const NFT_COLUMN_COUNT = 'NFT_COLUMN_COUNT'
export const UI_ERROR = 'UI_ERROR'
export const NEAR_STATUS = 'NEAR_STATUS'
export const ARTEX_STATUS = 'ARTEX_STATUS'
export const COUNT_INFO = 'COUNT_INFO'

export const PROFILE_STATUS = 'PROFILE_STATUS'
export const LOYALTY_STATUS = 'LOYALTY_STATUS'

export interface StateType {
  coinData: {
    near_value: number
    artex_in_near: number
  }
  profileData: {
    profile_status: {
      avatar: string
      banner: string
      bio: string
      discord: string
      id: string
      mail: string
      name: string
      level: number
      point: number
      quests: number
      amount: string
    }
    loyalty: string
  }
}
