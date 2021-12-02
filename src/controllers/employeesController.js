import { INTERNAL_SERVER_ERROR, CONFLICT, CREATED, OK, NOT_FOUND, BAD_REQUEST } from 'http-status';
import employeesHelper from '../helpers/employeesHelper';
import responseHelper from '../services/responseHelper';
import pagination from '../services/paginateHelper';

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

  /**
     * Handle updateEmployee.
     * @param {object} req user request.
     * @param {object} res data response.
     * @returns {object} returned object of data.
     */
  static async updateEmployee(req, res) {
    try {
      if (req.body && Object.keys(req.body).length === 0 && Object.getPrototypeOf(req.body) === Object.prototype) {
        responseHelper.handleError(BAD_REQUEST, `Changes to update not found.`);
        return responseHelper.response(res);
      }

      let data = await employeesHelper.employeeExist('_id', req.params.employeeId);
      if (!data || data.banned === true) {
        responseHelper.handleError(NOT_FOUND, `Employee with id ${req.params.employeeId} not found.`);
        return responseHelper.response(res);
      }

      data = await employeesHelper.editEmployee(req.body, data);
      responseHelper.handleSuccess(OK, 'Employee updated successfully.', data);
      return responseHelper.response(res);
    } catch (error) {
      return res.status(INTERNAL_SERVER_ERROR).json({
        status: INTERNAL_SERVER_ERROR,
        message: error.toString()
      });
    }
  }

  /**
     * Handle viewUnbannedEmployees.
     * @param {object} req user request.
     * @param {object} res data response.
     * @param {object} next move data response.
     * @returns {object} response.
     */
  static async viewUnbannedEmployees(req, res, next) {
    try {
      const { start, end, pages, skip, paginate } = await pagination.paginateData(req.query);
      const fetchedData = await employeesHelper.viewUnbannedEmployees(skip, start, 'banned', false);
      const countedData = await employeesHelper.countData('banned', false);

      const allDatata = fetchedData;
      const countAllData = countedData;

      if (countAllData < 1) {
        responseHelper.handleError(NOT_FOUND, 'Employees not found at the moment');
        return responseHelper.response(res);
      }

      req.data = { allDatata, countAllData, start, end, pages, skip, paginate };
      next();
    } catch (error) {
      responseHelper.handleError(INTERNAL_SERVER_ERROR, error.toString());
      return responseHelper.response(res);
    }
  }

  /**
     * Handle viewbannedEmployees.
     * @param {object} req user request.
     * @param {object} res data response.
     * @param {object} next move data response.
     * @returns {object} response.
     */
  static async viewbannedEmployees(req, res, next) {
    try {
      const { start, end, pages, skip, paginate } = await pagination.paginateData(req.query);
      const fetchedData = await employeesHelper.viewUnbannedEmployees(skip, start, 'banned', true);
      const countedData = await employeesHelper.countData('banned', true);

      const allDatata = fetchedData;
      const countAllData = countedData;

      if (countAllData < 1) {
        responseHelper.handleError(NOT_FOUND, 'Deleted employees not found at the moment');
        return responseHelper.response(res);
      }

      req.data = { allDatata, countAllData, start, end, pages, skip, paginate };
      next();
    } catch (error) {
      responseHelper.handleError(INTERNAL_SERVER_ERROR, error.toString());
      return responseHelper.response(res);
    }
  }
}

export default EmployeesController;
