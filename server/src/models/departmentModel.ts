import { db } from '../db/index.js';
import type { Pagination, Sort } from '../utils/http.js';

export interface Department {
  id: number;
  name: string;
  budget: number;
  opened_on: string;
  planned_positions: number;
}

export type DepartmentInput = Omit<Department, 'id'>;

export interface DepartmentListItem extends Department {
  employee_count: number;
}

export interface DepartmentsPage {
  items: DepartmentListItem[];
  total: number;
}

export const DEPARTMENT_SORT_FIELDS = [
  'id',
  'name',
  'budget',
  'opened_on',
  'planned_positions',
  'employee_count',
] as const;

export type DepartmentSortField = (typeof DEPARTMENT_SORT_FIELDS)[number];
export type DepartmentListParams = Pagination & Sort<DepartmentSortField>;

const DEPARTMENT_COLUMNS = 'id, name, budget::float8 AS budget, opened_on::text AS opened_on, planned_positions';

const LIST_QUERY = `SELECT ${DEPARTMENT_COLUMNS},
  (SELECT COUNT(*)::int FROM employees e WHERE e.department_id = d.id) AS employee_count
  FROM departments d`;

export function departmentExists(id: number) {
  return db.one<boolean>('SELECT EXISTS(SELECT 1 FROM departments WHERE id = $1) AS exists', [id], (row) => row.exists);
}

export function findDepartments({ limit, offset, sortBy, sortOrder }: DepartmentListParams): Promise<DepartmentsPage> {
  const direction = sortOrder === 'desc' ? 'DESC' : 'ASC';

  return db.task(async (task) => {
    const items = await task.any<DepartmentListItem>(
      `${LIST_QUERY} ORDER BY ${sortBy} ${direction}, d.id LIMIT $1 OFFSET $2`,
      [limit, offset],
    );
    const { total } = await task.one<{ total: number }>('SELECT COUNT(*)::int AS total FROM departments');
    return { items, total };
  });
}

export function findDepartment(id: number) {
  return db.oneOrNone<Department>(`SELECT ${DEPARTMENT_COLUMNS} FROM departments WHERE id = $1`, [id]);
}

export function insertDepartment(data: DepartmentInput) {
  return db.one<Department>(
    `INSERT INTO departments (name, budget, opened_on, planned_positions)
    VALUES ($(name), $(budget), $(opened_on), $(planned_positions)) RETURNING ${DEPARTMENT_COLUMNS}`,
    data,
  );
}

export function updateDepartment(id: number, data: DepartmentInput) {
  return db.oneOrNone<Department>(
    `UPDATE departments SET name=$(name), budget=$(budget), opened_on=$(opened_on), planned_positions=$(planned_positions)
    WHERE id=$(id) RETURNING ${DEPARTMENT_COLUMNS}`,
    { id, ...data },
  );
}

export function deleteDepartment(id: number) {
  return db.oneOrNone<{ id: number }>('DELETE FROM departments WHERE id = $1 RETURNING id', [id]);
}
