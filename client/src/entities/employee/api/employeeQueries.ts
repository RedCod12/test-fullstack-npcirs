
import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

import { employeeApi } from './employeeApi'
import { SaveEmployeeParams } from '../model/types'

export const employeeQueries = {
  all: () => ['employees'] as const,

  byDepartment: (departmentId: number | null) =>
    queryOptions({
      queryKey: ['employees', departmentId] as const,
      queryFn: () => {
        if (departmentId === null) {
          throw new Error('Department ID is required')
        }

        return employeeApi.list(departmentId)
      },
    }),
}

export function useEmployees(departmentId: number | null) {
  return useQuery({
    ...employeeQueries.byDepartment(departmentId),
    enabled: departmentId !== null,
  })
}

export function useSaveEmployee() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, payload }: SaveEmployeeParams) =>
      id !== undefined
        ? employeeApi.update(id, payload)
        : employeeApi.create(payload),

    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: employeeQueries.all(),
      }),
  })
}

export function useDeleteEmployee() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: employeeApi.remove,

    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: employeeQueries.all(),
      }),
  })
}
