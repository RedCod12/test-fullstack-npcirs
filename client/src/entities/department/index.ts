export type {
    Department,
    DepartmentInput,
    SortOrder,
    DepartmentListParams,
    DepartmentSortField,
    SaveDepartmentParams,
} from './model/types'
export {
  departmentQueries,
  useDepartments,
  useSaveDepartment,
  useDeleteDepartment,
} from './api/departmentQueries'
export { departmentApi } from './api/departmentApi'
