import { z } from 'zod';
import * as departments from '../models/departmentModel.js';
import { parseId, parsePagination, validate, parseSort, assertFound } from '../utils/http.js';
import type { Request, Response } from 'express';

const departmentSchema = z
  .object({
    name: z.string().trim().min(2).max(120),
    budget: z.number().nonnegative().max(999_999_999_999.99),
    opened_on: z.string().date(),
    planned_positions: z.number().int().nonnegative().max(1_000_000),
  })
  .strict();

export async function list(req: Request, res: Response) {
  res.json(
    await departments.findDepartments({
      ...parsePagination(req.query),
      ...parseSort(req.query, departments.DEPARTMENT_SORT_FIELDS, 'id'),
    }),
  );
}

export async function get(req: Request<{ id: string }>, res: Response) {
  res.json(
    assertFound(await departments.findDepartment(parseId(req.params.id)), 'DEPARTMENT_NOT_FOUND'),
  );
}

export async function create(req: Request, res: Response) {
  const row = await departments.insertDepartment(validate(departmentSchema, req.body));
  res.location(`/api/departments/${row.id}`).status(201).json(row);
}

export async function update(req: Request<{ id: string }>, res: Response) {
  const row = await departments.updateDepartment(parseId(req.params.id), validate(departmentSchema, req.body));

  res.json(assertFound(row, 'DEPARTMENT_NOT_FOUND'));
}

export async function remove(req: Request<{ id: string }>, res: Response) {
  assertFound(await departments.deleteDepartment(parseId(req.params.id)), 'DEPARTMENT_NOT_FOUND');

  res.status(204).end();
}
