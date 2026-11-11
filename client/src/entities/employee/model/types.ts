export interface Employee {
  id: number
  departmentId: number
  fullName: string
  position: string
  grade: number
  salary: number
  hiredAt: string
}

export type EmployeeInput = Omit<Employee, 'id'>

export interface EmployeeDto {
  id: number
  department_id: number
  full_name: string
  position: string
  grade: number
  salary: number
  hired_at: string
}

export type EmployeeInputDto = Omit<EmployeeDto, 'id'>

export type SaveEmployeeParams = {
  id?: number
  payload: EmployeeInput
}
