import _ from 'lodash';
import EmployeeSchema from '../models/employeesModel';

/**
* This class contains all methods (functions) required to handle
* saveData function.
* Etc ...
*/
class UserHelper {
  /**
   * employeeExist by table column and value.
   * @param {string} attribute table column.
   * @param {string} value employees details.
   * @returns {object} exist employees.
   */
  static async employeeExist(attribute, value) {
    const data = await EmployeeSchema.findOne({ [attribute]: value });
    return data;
  }

  /**
   * saveData into employees table in database.
   * @param {object} body employee details.
   * @returns {object} saved data details.
   */
  static async saveData(body) {
    let data = await EmployeeSchema.create({
      name: body.name,
      email: body.email,
      phone: body.phone,
      employmentDate: body.employmentDate,
      birthDate: body.birthDate,
      home: body.home
    });

    data = _.omit(data.toObject(), ['banned']);
    return data;
  }

  /**
   * editEmployee from employees table in database.
   * @param {object} body new employee details.
   * @param {object} existEmployee exist employee details.
   * @returns {object} updated employee details.
   */
  static async editEmployee(body, existEmployee) {
    let data = await EmployeeSchema.updateOne({ _id: existEmployee.id },
      {
        $set: {
          name: body.name || existEmployee.name,
          phone: body.phone || existEmployee.phone,
          employmentDate: body.employmentDate || existEmployee.employmentDate,
          birthDate: body.birthDate || existEmployee.birthDate,
          home: body.home || existEmployee.home,
        }
      }
    );

    if (data.ok === 1) {
      data = await this.employeeExist('_id', existEmployee.id);

      data = _.omit(data.toObject(), ['banned']);
      return data;
    }

    return undefined;
  }

  /**
   * destroyEmployee by table column and value.
   * @param {string} attribute table column.
   * @param {string} value a employee email.
   * @returns {string} an output.
   */
  static async destroyEmployee(attribute, value) {
    await EmployeeSchema.deleteOne({ [attribute]: value });
  }

  /**
   * banEmployee by value.
   * @param {string} value a employee id.
   * @returns {string} an output.
   */
  static async banEmployee(value) {
    await EmployeeSchema.updateOne({ _id: value }, { $set: { banned: true } });
  }

  /**
   * countData by table column and value.
   * @param {string} attribute table column.
   * @param {string} value a employee email.
   * @returns {string} an output.
   */
  static async countData(attribute, value) {
    const data = await EmployeeSchema.countDocuments({ [attribute]: value });
    return data;
  }

  /**
   * viewUnbannedEmployees by table column and value.
   * @param {integer} skip limitation point.
   * @param {integer} start start point.
   * @param {string} attribute table column.
   * @param {string} value value to be found.
   * @returns {object} a founded pending appointments.
   */
  static async viewUnbannedEmployees(skip, start, attribute, value) {
    const data = await EmployeeSchema.find({ [attribute]: value }).select("-banned").skip(start).limit(skip)
      .sort({ updatedAt: -1 });

    return data;
  }

  /**
   * viewbannedEmployees by table column and value.
   * @param {integer} skip limitation point.
   * @param {integer} start start point.
   * @param {string} attribute table column.
   * @param {string} value value to be found.
   * @returns {object} a founded pending appointments.
   */
  static async viewbannedEmployees(skip, start, attribute, value) {
    const data = await EmployeeSchema.find({ [attribute]: value }).select("-banned").skip(start).limit(skip)
      .sort({ updatedAt: -1 });

    return data;
  }
}

export default UserHelper;
