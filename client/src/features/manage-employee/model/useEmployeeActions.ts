
import { useQueryClient } from '@tanstack/react-query'

import {
  useSaveEmployee,
  useDeleteEmployee,
  type EmployeeInput,
} from '@/entities/employee'

import { statsQueries } from '@/entities/stats'

type SaveEmployeeParams = {
  id?: number
  payload: EmployeeInput
}

export function useEmployeeActions() {
  const queryClient = useQueryClient()

  const saveMutation = useSaveEmployee()
  const deleteMutation = useDeleteEmployee()

  const notifyChanged = () => {
    void queryClient.invalidateQueries({
      queryKey: statsQueries.all().queryKey,
    })
  }

  const save = async (params: SaveEmployeeParams) => {
    const employee = await saveMutation.mutateAsync(params)

    notifyChanged()

    return employee
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
