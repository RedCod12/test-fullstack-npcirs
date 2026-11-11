import type { DepartmentInput } from '@/entities/department'
import type { FormFieldConfig } from '@/shared/ui/types'

export const departmentFields = [
  {
    name: 'name',
    label: 'Название отдела',
    required: true,
  },
  {
    name: 'budget',
    label: 'Бюджет, ₽',
    type: 'number',
    required: true,
    min: 0,
    step: 0.01,
  },
  {
    name: 'openedOn',
    label: 'Дата открытия',
    type: 'date',
    required: true,
  },
  {
    name: 'plannedPositions',
    label: 'Штатных мест',
    type: 'number',
    required: true,
    min: 0,
    step: 1,
  },
] satisfies FormFieldConfig<DepartmentInput>[]