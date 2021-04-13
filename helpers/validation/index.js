const Joi = require("joi");

module.exports.validateUser = (req, res, next) => {

  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(12).required(),
    name: Joi.string().alphanum().min(3).max(20),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    const [{ message }] = error.details;
    return res.status(400).json({
      status: 400,
      message: `Field: ${message.replace(/"/g, "")}`,
      data: "Bad Request",
    });
  }
  next();
};
