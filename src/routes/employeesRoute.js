import Router from 'express';
import employees from '../controllers/employeesController';
import { validateCreateEmployee } from '../middlewares/schemaMiddleware';

const employeesRouter = Router();

employeesRouter
  .post('/create-employee', validateCreateEmployee, employees.createEmployee);

export default employeesRouter;
