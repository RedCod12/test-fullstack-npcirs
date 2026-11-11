import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import type { Department, DepartmentInput } from '@/entities/department'
import { departmentSchema } from './departmentSchema'

interface UseDepartmentFormOptions {
  initial?: Department
  onSave: (data: DepartmentInput) => Promise<void>
}

export function useDepartmentForm({
  initial,
  onSave,
}: UseDepartmentFormOptions) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<DepartmentInput>({
    resolver: zodResolver(departmentSchema),
    defaultValues: {
      name: initial?.name ?? '',
      budget: initial?.budget ?? 1_000_000,
      openedOn: initial?.openedOn ?? new Date().toISOString().slice(0, 10),
      plannedPositions: initial?.plannedPositions ?? 10,
    },
  })

  const submit = handleSubmit(async data => {
    try {
      await onSave(data)
    } catch (error) {
      setError('root.server', {
        message:
          error instanceof Error
            ? error.message
            : 'Не удалось сохранить отдел',
      })
    }
  })

  return {
    register,
    errors,
    isSubmitting,
    submit,
  }
}