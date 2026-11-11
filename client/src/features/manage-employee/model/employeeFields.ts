import type { EmployeeInput } from '@/entities/employee'
import type { FormFieldConfig } from '@/shared/ui/types'

export const employeeFields = [
  {
    name: 'fullName',
    label: 'ФИО',
    placeholder: 'Например, Анна Иванова',
    required: true,
  },
  {
    name: 'position',
    label: 'Должность',
    required: true,
  },
  {
    name: 'salary',
    label: 'Оклад, ₽',
    type: 'number',
    required: true,
    min: 0,
    step: 0.01,
  },
  {
    name: 'grade',
    label: 'Грейд',
    type: 'number',
    required: true,
    min: 1,
    max: 10,
    step: 1,
  },
  {
    name: 'hiredAt',
    label: 'Дата приёма',
    type: 'date',
    required: true,
  },
] satisfies FormFieldConfig<EmployeeInput>[]