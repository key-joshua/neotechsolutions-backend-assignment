import Joi from 'joi';
import joiPhone from 'joi-phone-number';
import validateSchema from './validateSchema';

const customJoi = Joi.extend(joiPhone);

/**
* This method handle validation create employee details.
* @param {object} req an employee details request.
* @param {object} res a response.
* @param {object} next if true move response.
* @returns {string}  a status and data.
*/
const validateCreateEmployee = (req, res, next) => {
  const dataSchema = Joi.object()
    .keys({
      name: Joi.string().min(3).max(50).required()
        .messages({
          'any.required': 'name is required',
          'string.empty': 'name is not allowed to be empty',
        }),
      email: Joi.string().email().required().messages({
        'any.required': 'email is required',
        'string.empty': 'email is not allowed to be empty',
        'string.email': 'email must be a valid email',
      }),
      phone: customJoi.string().phoneNumber({ format: 'international', strict: true }).required().messages({
        'any.required': 'phone is required',
        'string.empty': 'phone is not allowed to be empty',
        'phoneNumber.invalid': 'phone did not seem to be a phone number',
      }),
      employmentDate: Joi.date().required()
        .messages({
          'any.required': 'employmentDate is required',
          'string.empty': 'employmentDate is not allowed to be empty',
        }),
      birthDate: Joi.date().min(new Date('1900-01-01').toISOString().split('T')[0]).max(new Date().toISOString().split('T')[0]).required()
        .messages({
          'any.required': 'birthDate is required',
          'string.empty': 'birthDate is not allowed to be empty',
        }),
      home: Joi.array().required().items(
        Joi.object({
          city: Joi.string().required().messages({
            'any.required': 'city is required',
            'string.empty': 'city is not allowed to be empty',
          }),
          ZIPCode: Joi.string().required().messages({
            'any.required': 'ZIPCode is required',
            'string.empty': 'ZIPCode is not allowed to be empty',
          }),
          AddressLine1: Joi.string().required().messages({
            'any.required': 'AddressLine1 is required',
            'string.empty': 'AddressLine1 is not allowed to be empty',
          }),
          AddressLine2: Joi.string().required().messages({
            'any.required': 'AddressLine2 is required',
            'string.empty': 'AddressLine2 is not allowed to be empty',
          }),
        }).required()
      )
    })
    .options({ abortEarly: false });

  return validateSchema(dataSchema, req.body, res, next);
};

/**
* This method handle validation update employee details.
* @param {object} req an employee details request.
* @param {object} res a response.
* @param {object} next if true move response.
* @returns {string}  a status and data.
*/
const validateUpdateEmployee = (req, res, next) => {
  const dataSchema = Joi.object()
    .keys({
      name: Joi.string().min(3).max(50)
        .messages({
          'any.required': 'name is required',
          'string.empty': 'name is not allowed to be empty',
        }),
      email: Joi.string().email().messages({
        'any.required': 'email is required',
        'string.empty': 'email is not allowed to be empty',
        'string.email': 'email must be a valid email',
      }),
      phone: customJoi.string().phoneNumber({ format: 'international', strict: true }).messages({
        'any.required': 'phone is required',
        'string.empty': 'phone is not allowed to be empty',
        'phoneNumber.invalid': 'phone did not seem to be a phone number',
      }),
      employmentDate: Joi.date()
        .messages({
          'any.required': 'employmentDate is required',
          'string.empty': 'employmentDate is not allowed to be empty',
        }),
      birthDate: Joi.date().min(new Date('1900-01-01').toISOString().split('T')[0]).max(new Date().toISOString().split('T')[0])
        .messages({
          'any.required': 'birthDate is required',
          'string.empty': 'birthDate is not allowed to be empty',
        }),
      home: Joi.array().items(
        Joi.object({
          city: Joi.string().required().messages({
            'any.required': 'city is required',
            'string.empty': 'city is not allowed to be empty',
          }),
          ZIPCode: Joi.string().required().messages({
            'any.required': 'ZIPCode is required',
            'string.empty': 'ZIPCode is not allowed to be empty',
          }),
          AddressLine1: Joi.string().required().messages({
            'any.required': 'AddressLine1 is required',
            'string.empty': 'AddressLine1 is not allowed to be empty',
          }),
          AddressLine2: Joi.string().required().messages({
            'any.required': 'AddressLine2 is required',
            'string.empty': 'AddressLine2 is not allowed to be empty',
          }),
        }).required()
      )
    })
    .options({ abortEarly: false });

  return validateSchema(dataSchema, req.body, res, next);
};

export {
  validateCreateEmployee,
  validateUpdateEmployee,
};
