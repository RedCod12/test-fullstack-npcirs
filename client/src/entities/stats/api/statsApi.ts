import { request } from '@/shared/api/request'
import type { Stats } from '../model/types'

export const statsApi = {
  get: () => request<Stats>('/stats'),
}