export type TokenKind = 'USDC' | 'USDCX'

export interface CampaignPublicInfo {
  campaignId: number
  creativeUri: string
  category: string
  active: boolean
}

export interface CampaignMetadata {
  aleoTxId: string
  campaignId: number
  title: string
  description: string
  creativeURI: string
  category: string
  ownerAddress: string
  createdAt: string
}

export interface ChartPoint {
  label: string
  impressions: number
  clicks: number
  spendUsdc: number
  usdcEarned: number
  usdcxEarned: number
}
