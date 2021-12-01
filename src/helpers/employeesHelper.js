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
}

export default UserHelper;
