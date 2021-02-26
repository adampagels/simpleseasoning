const Joi = require("@hapi/joi");

const registerValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(4).max(15).required().messages({
      "string.min": "Username must be between 4 and 30 characters.",
      "string.max": "Username must be between 4 and 30 characters.",
      "string.empty": "A username is required!",
    }),
    password: Joi.string().min(6).required().messages({
      "string.min": "Password must be at least 6 characters.",
      "string.empty": "A password is required!",
    }),
    email: Joi.string().min(6).required().email().messages({
      "string.min": "Email must be at least 6 characters",
      "string.empty": "An email is required!",
    }),
  }).options({ abortEarly: false });
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email().messages({
      "string.min": "Email must be at least 6 characters",
      "string.empty": "An email is required!",
    }),
    password: Joi.string().min(6).required().messages({
      "string.min": "Password must be at least 6 characters.",
      "string.empty": "A password is required!",
    }),
  }).options({ abortEarly: false });
  return schema.validate(data);
};

const addRecipeValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(4).max(20).required().messages({
      "string.min": "Title must be between 4 and 30 characters.",
      "string.max": "Title must be between 4 and 30 characters.",
      "string.empty": "Don't forget a title!",
    }),
    description: Joi.string().min(10).max(200).required().messages({
      "string.min": "Description must be between 10 and 30 characters.",
      "string.max": "Description must be between 10 and 30 characters.",
      "string.empty": "Please add a quick description!",
    }),
    photo: Joi.string().optional(),
    ingredients: Joi.array().min(1).max(30).required().messages({
      "array.min": "Must have between 1 and 30 ingredients.",
      "array.max": "Must have between 1 and 30 ingredients.",
      "array.empty": "Please add some ingredients!",
    }),
    instructions: Joi.array().min(1).max(30).required().messages({
      "array.min": "Must have between 1 and 30 instructions.",
      "array.max": "Must have between 1 and 30 instructions.",
      "array.empty": "Please add some instructions!",
    }),
    cookTime: Joi.number().max(3).required().messages({
      "number.max": "Cook time cannnot be longer than 3 numbers",
      "number.empty": "Please add a cook time!",
    }),
    prepTime: Joi.number().max(3).required().messages({
      "number.max": "Prep time cannnot be longer than 3 numbers",
      "number.empty": "Please add a prep time!",
    }),
    diet: Joi.array().max(20).optional(),
  }).options({ abortEarly: false });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.addRecipeValidation = addRecipeValidation;
