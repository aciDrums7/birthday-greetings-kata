import Joi from 'joi';

const stringRegEx = Joi.string()
  .pattern(new RegExp('^[a-zA-Z]+$'))
  .min(3)
  .max(100);

const employeeSchema = Joi.object({
  last_name: stringRegEx.required(),
  first_name: stringRegEx.required(),
  email: Joi.string().email().required(),
  date_of_birth: Joi.string()
    .pattern(new RegExp('^[0-9]{4}/[0-9]{1,2}/[0-9]{1,2}$'))
    .required(),
});

const validateEmployee = (data: any) => employeeSchema.validate(data);

export default validateEmployee