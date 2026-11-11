import {
    queryOptions,
    useQuery,
    useMutation,
    useQueryClient,
} from '@tanstack/react-query'

import { departmentApi } from './departmentApi'
import { SaveDepartmentParams } from '../model/types'

export const departmentQueries = {
    all: () =>
        queryOptions({
            queryKey: ['departments', 'all'] as const,
            queryFn: departmentApi.all,
            staleTime: 60_000,
        }),
}

export function useDepartments(enabled = true) {
    return useQuery({
        ...departmentQueries.all(),
        enabled,
    })
}

export function useSaveDepartment() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, payload }: SaveDepartmentParams) =>
            id !== undefined
                ? departmentApi.update(id, payload)
                : departmentApi.create(payload),

        onSuccess: () =>
            queryClient.invalidateQueries({
                queryKey: departmentQueries.all().queryKey,
            }),
    })
}

export function useDeleteDepartment() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: departmentApi.remove,

        onSuccess: () =>
            queryClient.invalidateQueries({
                queryKey: departmentQueries.all().queryKey,
            }),
    })
}