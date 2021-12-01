import Router from 'express';
import employeesRouter from './employeesRoute';

const router = Router();
router.use('/employees', employeesRouter);

export default router;
