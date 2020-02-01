const Joi = require("@hapi/joi");

const registerValidation = data => {
	const schema = Joi.object({
		username: Joi.string()
			.min(4)
			.required(),
		password: Joi.string()
			.min(6)
			.required(),
		email: Joi.string()
			.min(6)
			.required()
			.email()
	});
	return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
