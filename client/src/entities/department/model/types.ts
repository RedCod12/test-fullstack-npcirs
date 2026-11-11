export interface DepartmentDto {
  id: number
  name: string
  budget: number
  opened_on: string
  planned_positions: number
}

export type DepartmentInputDto = Omit<DepartmentDto, 'id'>

export type DepartmentSortField =
  | 'id'
  | 'name'
  | 'budget'
  | 'openedOn'
  | 'plannedPositions'

export type SortOrder = 'asc' | 'desc'

export interface DepartmentListParams {
  limit: number
  offset: number
  sortBy?: DepartmentSortField
  sortOrder?: SortOrder
}

export interface Department {
  id: number
  name: string
  budget: number
  openedOn: string
  plannedPositions: number
}

export type DepartmentInput = Omit<Department, 'id'>

export type SaveDepartmentParams = {
  id?: number
  payload: DepartmentInput
}