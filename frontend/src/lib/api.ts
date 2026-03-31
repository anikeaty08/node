import axios from 'axios'
import { config } from './config'
import type { CampaignMetadata } from '../types/aleo'

const api = axios.create({
  baseURL: config.backendUrl,
})

export async function fetchCampaignMetadata() {
  const response = await api.get<CampaignMetadata[]>('/api/campaigns')
  return response.data
}

export async function saveCampaignMetadata(payload: Omit<CampaignMetadata, 'createdAt'>) {
  const response = await api.post<CampaignMetadata>('/api/campaigns', payload)
  return response.data
}

export async function uploadCreative(file: File) {
  const formData = new FormData()
  formData.append('creative', file)
  const response = await api.post<{ cid: string; uri: string }>('/api/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return response.data
}

export async function fetchCampaignsPublicMapping() {
  const response = await axios.get<Array<Record<string, unknown>>>(
    `${config.aleoApiUrl}/program/${config.programs.adRegistry}/mapping/campaigns_public`,
  )
  return response.data
}
