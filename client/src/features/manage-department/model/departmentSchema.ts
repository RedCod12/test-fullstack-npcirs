import { z } from 'zod'

export const departmentSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Минимум 2 символа')
    .max(120, 'Максимум 120 символов'),

  budget: z
    .number()
    .finite('Укажите корректный бюджет')
    .min(0, 'Бюджет не может быть отрицательным'),

  openedOn: z
    .iso.date('Укажите корректную дату'),

  plannedPositions: z
    .number()
    .int('Количество мест должно быть целым числом')
    .min(0, 'Количество мест не может быть отрицательным'),
})

export type DepartmentFormValues = z.infer<typeof departmentSchema>