import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import departmentRoutes from './routes/departmentRoutes.js';
import employeeRoutes from './routes/employeeRoutes.js';
import statsRoutes from './routes/statsRoutes.js';

import { errorHandler, notFound } from './middleware/errorHandler.js';
import { verifyDatabase } from './db/index.js';

const app = express();
app.disable('x-powered-by');
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }));
app.use(express.json({ limit: '32kb' }));
app.get('/api/health', (_req, res) => res.json({ ok: true }));
app.use('/api/stats', statsRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/employees', employeeRoutes);
app.use(notFound);
app.use(errorHandler);

const port = Number(process.env.PORT || 4000);
try {
  await verifyDatabase();
  app.listen(port, () => console.log(`API: http://localhost:${port}`));
} catch (error) {
  console.error('Не удалось подключиться к PostgreSQL:', error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
