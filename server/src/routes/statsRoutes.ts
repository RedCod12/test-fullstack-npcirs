import { Router } from 'express';
import * as controller from '../controllers/statsController.js';

const router = Router();

router.get('/', controller.get);

export default router;
