import type { Department, DepartmentInput } from './types'
import type { DepartmentDto, DepartmentInputDto } from './types'

export function mapDepartmentFromApi(dto: DepartmentDto): Department {
  return {
    id: dto.id,
    name: dto.name,
    budget: dto.budget,
    openedOn: dto.opened_on,
    plannedPositions: dto.planned_positions,
  }
}

export function mapDepartmentToApi(
  department: DepartmentInput,
): DepartmentInputDto {
  return {
    name: department.name,
    budget: department.budget,
    opened_on: department.openedOn,
    planned_positions: department.plannedPositions,
  }
}