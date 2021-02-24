const Joi = require("@hapi/joi");

const registerValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(4).required(),
    password: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
  });
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

const addRecipeValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().max(20).required(),
    description: Joi.string().max(200).optional(),
    photo: Joi.string().optional(),
    ingredients: Joi.array().max(30).optional(),
    instructions: Joi.array().max(30).optional(),
    cookTime: Joi.number().max(3).optional(),
    prepTime: Joi.number().max(3).optional(),
    diet: Joi.array().max(20).optional(),
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.addRecipeValidation = addRecipeValidation;
