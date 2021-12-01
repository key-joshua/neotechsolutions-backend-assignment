import { INTERNAL_SERVER_ERROR, CREATED } from 'http-status';
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
     * Handle createEmployees.
     * @param {object} req user request.
     * @param {object} res data response.
     * @returns {object} returned object of data.
     */
  static async createEmployee(req, res) {
    try {
      const data = await employeesHelper.saveData(req.body);

      responseHelper.handleSuccess(CREATED, 'Employee created successfully.', data);
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
