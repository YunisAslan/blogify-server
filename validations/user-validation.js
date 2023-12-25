const Joi = require("joi");

const userValidationSchema = Joi.object({
  username: Joi.string().alphanum().min(2).max(30).required(),
  fullName: Joi.string().min(2).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  profileImage: Joi.string().uri().optional(),
  isAdmin: Joi.boolean(),
});

module.exports = userValidationSchema;
