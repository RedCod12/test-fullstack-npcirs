import { db } from '../db/index.js';

export interface DashboardStats {
  departments: number;
  employees: number;
  budget: number;
  avg_salary: number;
}

export function findDashboardStats() {
  return db.one<DashboardStats>(`SELECT
    (SELECT COUNT(*)::int FROM departments) AS departments,
    (SELECT COUNT(*)::int FROM employees) AS employees,
    (SELECT COALESCE(SUM(budget),0)::float8 FROM departments) AS budget,
    (SELECT COALESCE(AVG(salary),0)::float8 FROM employees) AS avg_salary`);
}
