import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import type { Employee, EmployeeInput } from '@/entities/employee'
import { employeeSchema } from './employeeSchema'

interface UseEmployeeFormOptions {
  departmentId: number
  initial?: Employee
  onSave: (data: EmployeeInput) => Promise<void>
}

export function useEmployeeForm({
  departmentId,
  initial,
  onSave,
}: UseEmployeeFormOptions) {
  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<EmployeeInput>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      departmentId: initial?.departmentId ?? departmentId,
      fullName: initial?.fullName ?? '',
      position: initial?.position ?? '',
      salary: initial?.salary ?? 90_000,
      hiredAt: initial?.hiredAt ?? new Date().toISOString().slice(0, 10),
      grade: initial?.grade ?? 3,
    },
  })

  const field = (name: keyof EmployeeInput) => {
    const registration = register(name, {
      valueAsNumber: name === 'salary' || name === 'grade',
    })

    const { ref, ...props } = registration

    return {
      ...props,
      inputRef: ref,
    }
  }

  const submit = handleSubmit(async data => {
    try {
      await onSave(data)
    } catch (error) {
      setError('root.server', {
        message:
          error instanceof Error
            ? error.message
            : 'Не удалось сохранить сотрудника',
      })
    }
  })

  return {
    field,
    control,
    errors,
    isSubmitting,
    submit,
  }
}