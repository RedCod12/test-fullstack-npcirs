import { db } from '../db/index.js';

import type { Sort } from '../utils/http.js';

export interface Employee {
  id: number;
  department_id: number;
  full_name: string;
  position: string;
  salary: number;
  hired_at: string;
  grade: number;
}

export type EmployeeInput = Omit<Employee, 'id'>;

export const EMPLOYEE_SORT_FIELDS = ['id', 'full_name', 'position', 'salary', 'hired_at', 'grade'] as const;
export type EmployeeSortField = (typeof EMPLOYEE_SORT_FIELDS)[number];
export type EmployeeListParams = Sort<EmployeeSortField> & { departmentId: number };

const EMPLOYEE_COLUMNS =
  'id, department_id, full_name, position, salary::float8 AS salary, hired_at::text AS hired_at, grade';

export function findEmployees({ departmentId, sortBy, sortOrder }: EmployeeListParams) {
  const direction = sortOrder === 'desc' ? 'DESC' : 'ASC';
  return db.any<Employee>(
    `SELECT ${EMPLOYEE_COLUMNS} FROM employees WHERE department_id = $1 ORDER BY ${sortBy} ${direction}, id`,
    [departmentId],
  );
}

export function findEmployee(id: number) {
  return db.oneOrNone<Employee>(`SELECT ${EMPLOYEE_COLUMNS} FROM employees WHERE id=$1`, [id]);
}

export function insertEmployee(data: EmployeeInput) {
  return db.one<Employee>(
    `INSERT INTO employees (department_id,full_name,position,salary,hired_at,grade)
    VALUES ($(department_id),$(full_name),$(position),$(salary),$(hired_at),$(grade)) RETURNING ${EMPLOYEE_COLUMNS}`,
    data,
  );
}

export function updateEmployee(id: number, data: EmployeeInput) {
  return db.oneOrNone<Employee>(
    `UPDATE employees SET department_id=$(department_id),full_name=$(full_name),position=$(position),
    salary=$(salary),hired_at=$(hired_at),grade=$(grade) WHERE id=$(id) RETURNING ${EMPLOYEE_COLUMNS}`,
    { id, ...data },
  );
}

export function deleteEmployee(id: number) {
  return db.oneOrNone<{ id: number }>('DELETE FROM employees WHERE id = $1 RETURNING id', [id]);
}
