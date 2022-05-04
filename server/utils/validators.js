const Joi = require("joi");

const logInValidation = (body) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("email"),
    password: Joi.string().required().label("password"),
  });
  return schema.validate(body);
};

const TokenValidation = (body) => {
  const schema = Joi.object({
    accessToken: Joi.string().required().label("Refresh Token"),
  });
  return schema.validate(body);
};

module.exports = { logInValidation, TokenValidation };
