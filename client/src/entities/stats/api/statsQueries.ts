import { queryOptions, useQuery } from '@tanstack/react-query'
import { statsApi } from './statsApi'

export const statsQueries = {
  all: () =>
    queryOptions({
      queryKey: ['stats'] as const,
      queryFn: statsApi.get,
    }),
}

export function useStats() {
  return useQuery(statsQueries.all())
}