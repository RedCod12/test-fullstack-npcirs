import { useEffect, useState } from 'react'

import {
  useEmployees,
  type Employee,
  type EmployeeInput,
} from '@/entities/employee'

import {
  useDepartments,
  type Department,
} from '@/entities/department'

import { useEmployeeActions } from '@/features/manage-employee'

interface UseEmployeeProps {
  department: Department | null
  onDepartmentChange: (department: Department | null) => void
}

export function useEmployeeTable({
  department,
  onDepartmentChange,
}: UseEmployeeProps) {
  const [selectedEmployee, setSelectedEmployee] =
    useState<Employee | null>(null)

  const [editor, setEditor] =
    useState<Employee | null | undefined>(undefined)

  const [confirmDelete, setConfirmDelete] = useState(false)
  const [error, setError] = useState('')

  const employeesQuery = useEmployees(department?.id ?? null)
  const departmentsQuery = useDepartments(editor !== undefined)

  const actions = useEmployeeActions()

  useEffect(() => {
    setSelectedEmployee(null)
    setConfirmDelete(false)
  }, [department?.id])

  const selectEmployee = (employee: Employee | null) => {
    setSelectedEmployee(employee)
    setError('')
  }

  const openCreate = () => {
    if (department) setEditor(null)
  }

  const openEdit = () => {
    if (selectedEmployee) setEditor(selectedEmployee)
  }

  const closeEditor = () => setEditor(undefined)

  const save = async (payload: EmployeeInput) => {
    setError('')

    try {
      const result = await actions.save({
        id: editor?.id,
        payload,
      })

      setSelectedEmployee(null)
      closeEditor()

      if (department?.id !== result.departmentId) {
        const departments = await departmentsQuery.refetch()

        const nextDepartment = departments.data?.find(
          item => item.id === result.departmentId,
        )

        if (nextDepartment) {
          onDepartmentChange(nextDepartment)
        } else {
          setError('Сотрудник сохранён, но не удалось выбрать новый отдел')
        }
      }
    } catch (error) {
      throw error

    }
  }

  const remove = async () => {
    if (!selectedEmployee) return

    setError('')

    try {
      await actions.remove(selectedEmployee.id)
      setSelectedEmployee(null)
      setConfirmDelete(false)
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Не удалось удалить сотрудника',
      )
    }
  }

  return {
    selectedEmployee,
    selectEmployee,

    employeesQuery,
    departmentsQuery,

    editor,
    isEditorOpen: editor !== undefined,
    openCreate,
    openEdit,
    closeEditor,

    confirmDelete,
    requestDelete: () => setConfirmDelete(true),
    cancelDelete: () => setConfirmDelete(false),

    save,
    remove,

    error,
    clearError: () => setError(''),

    isSaving: actions.isSaving,
    isDeleting: actions.isDeleting,
  }
}