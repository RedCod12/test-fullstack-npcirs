import { z } from 'zod'

export const employeeSchema = z.object({
  departmentId: z.number().int().positive('Выберите отдел'),

  fullName: z
    .string()
    .trim()
    .min(3, 'Минимум 3 символа')
    .max(160, 'Максимум 160 символов'),

  position: z
    .string()
    .trim()
    .min(2, 'Минимум 2 символа')
    .max(120, 'Максимум 120 символов'),

  salary: z
    .number()
    .finite('Укажите корректный оклад')
    .min(0, 'Оклад не может быть отрицательным'),

  hiredAt: z.iso.date('Укажите корректную дату'),

  grade: z
    .number()
    .int('Грейд должен быть целым числом')
    .min(1, 'Минимальный грейд — 1')
    .max(10, 'Максимальный грейд — 10'),
})