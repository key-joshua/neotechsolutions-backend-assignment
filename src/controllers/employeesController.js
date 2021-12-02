import { INTERNAL_SERVER_ERROR, CONFLICT, CREATED, OK, NOT_FOUND } from 'http-status';
import employeesHelper from '../helpers/employeesHelper';
import responseHelper from '../services/responseHelper';

/**
* This class contains all methods (functions) required to handle
* createEmployees function.
* fetchEmployees function.
* Etc ...
*/
class EmployeesController {
  /**
     * Handle createEmployee.
     * @param {object} req user request.
     * @param {object} res data response.
     * @returns {object} returned object of data.
     */
  static async createEmployee(req, res) {
    try {
      let data = await employeesHelper.employeeExist('email', req.body.email);
      if (data) {
        responseHelper.handleError(CONFLICT, 'Email already exist.');
        return responseHelper.response(res);
      }

      data = await employeesHelper.saveData(req.body);
      responseHelper.handleSuccess(CREATED, 'Employee created successfully.', data);
      return responseHelper.response(res);
    } catch (error) {
      return res.status(INTERNAL_SERVER_ERROR).json({
        status: INTERNAL_SERVER_ERROR,
        message: error.toString()
      });
    }
  }

  /**
     * Handle deleteEmployee.
     * @param {object} req user request.
     * @param {object} res data response.
     * @returns {object} returned object of data.
     */
  static async deleteEmployee(req, res) {
    try {
      const data = await employeesHelper.employeeExist('_id', req.params.employeeId);
      if (!data || data.banned === true) {
        responseHelper.handleError(NOT_FOUND, `Employee with id ${req.params.employeeId} not found.`);
        return responseHelper.response(res);
      }

      await employeesHelper.banEmployee(req.params.employeeId);
      responseHelper.handleSuccess(OK, 'Employee deleted successfully.');
      return responseHelper.response(res);
    } catch (error) {
      return res.status(INTERNAL_SERVER_ERROR).json({
        status: INTERNAL_SERVER_ERROR,
        message: error.toString()
      });
    }
  }
}

export default EmployeesController;
