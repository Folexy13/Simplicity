import Joi from "joi";

export const CreateUserSchemaBody = Joi.object({
  fullname: Joi.string(),
  email: Joi.string().email(),
  phoneNumber: Joi.string(),
  phoneCode: Joi.string(),
  countryOfBirth: Joi.string(),
  countryOfResidence: Joi.string(),
  dob: Joi.string(),
  course: Joi.string(),
  password: Joi.string().required(),
});

export const LoginSchemaBody = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email().required(),
});


export const OTPSchemaBody = Joi.object({
  otp: Joi.string().required(),
  email: Joi.string().email().required(),
});