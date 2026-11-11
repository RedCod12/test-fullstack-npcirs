import type { Request, Response } from 'express';
import * as stats from '../models/statsModel.js';

export async function get(_req: Request, res: Response) {
  res.json(await stats.findDashboardStats());
}
