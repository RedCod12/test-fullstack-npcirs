import type {
    Employee,
    EmployeeDto,
    EmployeeInput,
    EmployeeInputDto,
} from './types'

export const mapEmployeeFromApi = (dto: EmployeeDto): Employee => ({
  id: dto.id,
  departmentId: dto.department_id,
  fullName: dto.full_name,
  position: dto.position,
  grade: dto.grade,
  salary: dto.salary,
  hiredAt: dto.hired_at,
})

export const mapEmployeeToApi = (
  employee: EmployeeInput,
): EmployeeInputDto => ({
  department_id: employee.departmentId,
  full_name: employee.fullName,
  position: employee.position,
  grade: employee.grade,
  salary: employee.salary,
  hired_at: employee.hiredAt,
})