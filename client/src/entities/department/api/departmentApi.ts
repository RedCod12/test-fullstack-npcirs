
import { request } from '@/shared/api/request'
import type { Page } from '@/shared/model/types'
import type {
  Department,
  DepartmentInput,
  DepartmentListParams,
  DepartmentSortField,
} from '../model/types'
import type { DepartmentDto } from '../model/types'
import {
  mapDepartmentFromApi,
  mapDepartmentToApi,
} from '../model/departmentMappers'

const sortFields: Record<DepartmentSortField, string> = {
  id: 'id',
  name: 'name',
  budget: 'budget',
  openedOn: 'opened_on',
  plannedPositions: 'planned_positions',
}

export const departmentApi = {
  list: async ({
    limit,
    offset,
    sortBy,
    sortOrder,
  }: DepartmentListParams): Promise<Page<Department>> => {
    const params = new URLSearchParams({
      limit: String(limit),
      offset: String(offset),
    })

    if (sortBy && sortOrder) {
      params.set('sort_by', sortFields[sortBy])
      params.set('sort_order', sortOrder)
    }

    const page = await request<Page<DepartmentDto>>(
      `/departments?${params.toString()}`,
    )

    return {
      ...page,
      items: page.items.map(mapDepartmentFromApi),
    }
  },

  all: async (): Promise<Department[]> => {
    const limit = 100

    const first = await departmentApi.list({
      limit,
      offset: 0,
    })

    const pages = Math.ceil(first.total / limit)

    if (pages <= 1) {
      return first.items
    }

    const rest = await Promise.all(
      Array.from({ length: pages - 1 }, (_, index) =>
        departmentApi.list({
          limit,
          offset: (index + 1) * limit,
        }),
      ),
    )

    return [
      ...first.items,
      ...rest.flatMap(page => page.items),
    ]
  },

  create: async (data: DepartmentInput): Promise<Department> => {
    const dto = await request<DepartmentDto>('/departments', {
      method: 'POST',
      body: JSON.stringify(mapDepartmentToApi(data)),
    })

    return mapDepartmentFromApi(dto)
  },

  update: async (
    id: number,
    data: DepartmentInput,
  ): Promise<Department> => {
    const dto = await request<DepartmentDto>(`/departments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(mapDepartmentToApi(data)),
    })

    return mapDepartmentFromApi(dto)
  },

  remove: (id: number) =>
    request<void>(`/departments/${id}`, {
      method: 'DELETE',
    }),
}
