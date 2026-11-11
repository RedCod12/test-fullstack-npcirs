import { z } from 'zod';
import { assertFound, HttpError, parseId, parseSort, validate } from '../utils/http.js';

import * as employees from '../models/employeeModel.js';
import * as departments from '../models/departmentModel.js';
import type { Request, Response } from 'express';

const employeeSchema = z
  .object({
    department_id: z.number().int().positive(),
    full_name: z.string().trim().min(3).max(160),
    position: z.string().trim().min(2).max(120),
    salary: z.number().nonnegative().max(9_999_999_999.99),
    hired_at: z.string().date(),
    grade: z.number().int().min(1).max(10),
  })
  .strict();

async function assertDepartmentExists(
  id: number,
  code: 'DEPARTMENT_NOT_FOUND' | 'DEPARTMENT_REFERENCE_NOT_FOUND' =
    'DEPARTMENT_REFERENCE_NOT_FOUND',
) {
  if (!(await departments.departmentExists(id))) {
    throw new HttpError(code);
  }
}

export async function list(req: Request, res: Response) {
  const departmentId = parseId(req.query.department_id);
  const sort = parseSort(req.query, employees.EMPLOYEE_SORT_FIELDS, 'id', 'desc');
  await assertDepartmentExists(departmentId, 'DEPARTMENT_NOT_FOUND');
  res.json(await employees.findEmployees({ departmentId, ...sort }));
}

export async function get(req: Request<{ id: string }>, res: Response) {
  res.json(assertFound(await employees.findEmployee(parseId(req.params.id)), 'EMPLOYEE_NOT_FOUND'));
}

export async function create(req: Request, res: Response) {
  const data = validate(employeeSchema, req.body);
  await assertDepartmentExists(data.department_id);

  const row = await employees.insertEmployee(data);

  res.location(`/api/employees/${row.id}`).status(201).json(row);
}

export async function update(
  req: Request<{ id: string }>,
  res: Response,
) {
  const id = parseId(req.params.id);
  const data = validate(employeeSchema, req.body);

  await assertDepartmentExists(data.department_id);

  const row = await employees.updateEmployee(id, data);

  res.json(assertFound(row, 'EMPLOYEE_NOT_FOUND'));
}

export async function remove(
  req: Request<{ id: string }>,
  res: Response
) {
  assertFound(await employees.deleteEmployee(parseId(req.params.id)), 'EMPLOYEE_NOT_FOUND');
  res.status(204).end();
}
