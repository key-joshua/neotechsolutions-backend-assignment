import Router from 'express';
import paginate from '../middlewares/paginateMiddleware';
import employees from '../controllers/employeesController';
import { validateCreateEmployee, validateUpdateEmployee } from '../middlewares/schemaMiddleware';

const employeesRouter = Router();

employeesRouter
  .delete('/delete-employee/:employeeId', employees.deleteEmployee)
  .post('/create-employee', validateCreateEmployee, employees.createEmployee)
  .patch('/update-employee/:employeeId', validateUpdateEmployee, employees.updateEmployee)

  .get('/view-employees', employees.viewUnbannedEmployees, paginate.paginateData)
  .get('/view-deleted-employees', employees.viewbannedEmployees, paginate.paginateData);

export default employeesRouter;
