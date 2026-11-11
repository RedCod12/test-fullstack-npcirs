
import { useQueryClient } from '@tanstack/react-query'

import {
  useSaveDepartment,
  useDeleteDepartment,
  type DepartmentInput,
} from '@/entities/department'

import { statsQueries } from '@/entities/stats'

type SaveDepartmentParams = {
  id?: number
  payload: DepartmentInput
}

interface UseDepartmentActionsOptions {
  onChanged?: () => void
}

export function useDepartmentActions({
  onChanged,
}: UseDepartmentActionsOptions = {}) {
  const queryClient = useQueryClient()

  const saveMutation = useSaveDepartment()
  const deleteMutation = useDeleteDepartment()

  const notifyChanged = () => {
    void queryClient.invalidateQueries({
      queryKey: statsQueries.all().queryKey,
    })

    onChanged?.()
  }

  const save = async (params: SaveDepartmentParams) => {
    const department = await saveMutation.mutateAsync(params)

    notifyChanged()

    return department
  }

  const remove = async (id: number) => {
    await deleteMutation.mutateAsync(id)

    notifyChanged()
  }

  return {
    save,
    remove,
    isSaving: saveMutation.isPending,
    isDeleting: deleteMutation.isPending,
  }
}
