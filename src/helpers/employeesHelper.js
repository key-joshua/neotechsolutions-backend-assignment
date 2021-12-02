import EmployeeSchema from '../models/employeesModel';

/**
* This class contains all methods (functions) required to handle
* saveData function.
* Etc ...
*/
class UserHelper {
  /**
   * Save data into employees table in database.
   * @param {object} body employee details.
   * @returns {object} saved data details.
   */
  static async saveData(body) {
    const data = await EmployeeSchema.create({
      name: body.name,
      email: body.email,
      phone: body.phone,
      employmentDate: body.employmentDate,
      birthDate: body.birthDate,
      home: body.home
    });
    return data;
  }

  /**
   * Check a employee into employees table in database.
   * @param {string} attribute table column.
   * @param {string} value employees details.
   * @returns {object} exist employees.
   */
  static async employeeExist(attribute, value) {
    const data = await EmployeeSchema.findOne({ [attribute]: value });
    return data;
  }

  /**
   * Destroy a email.
   * @param {string} attribute table column.
   * @param {string} value a employee email.
   * @returns {string} an output.
   */
  static async destroyEmployee(attribute, value) {
    await EmployeeSchema.deleteOne({ [attribute]: value });
  }

  /**
   * ban a id.
   * @param {string} value a employee id.
   * @returns {string} an output.
   */
  static async banEmployee(value) {
    await EmployeeSchema.updateOne({ _id: value }, { $set: { banned: true } });
  }
}

export default UserHelper;
