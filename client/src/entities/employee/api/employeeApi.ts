
import { request } from '@/shared/api/request'
import type { Employee, EmployeeInput } from '../model/types'
import type { EmployeeDto } from '../model/types'
import {
  mapEmployeeFromApi,
  mapEmployeeToApi,
} from '../model/employeeMappers'

export const employeeApi = {
  list: async (departmentId: number): Promise<Employee[]> => {
    const employees = await request<EmployeeDto[]>(
      `/employees?department_id=${departmentId}`,
    )

    return employees.map(mapEmployeeFromApi)
  },

  create: async (data: EmployeeInput): Promise<Employee> => {
    const employee = await request<EmployeeDto>('/employees', {
      method: 'POST',
      body: JSON.stringify(mapEmployeeToApi(data)),
    })

    return mapEmployeeFromApi(employee)
  },

  update: async (
    id: number,
    data: EmployeeInput,
  ): Promise<Employee> => {
    const employee = await request<EmployeeDto>(`/employees/${id}`, {
      method: 'PUT',
      body: JSON.stringify(mapEmployeeToApi(data)),
    })

    return mapEmployeeFromApi(employee)
  },

  remove: (id: number) =>
    request<void>(`/employees/${id}`, {
      method: 'DELETE',
    }),
}
