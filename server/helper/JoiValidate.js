const Joi = require("joi");

exports.validateStudent = (student) => {
  const JoiSchema = Joi.object({
    Name: Joi.string().min(5).max(30).required(),
    Gender: Joi.string().required(),
    Class: Joi.string().required(),
    DOB: Joi.date().required(),
    Subject: Joi.string().required(),
  }).options({ abortEarly: false });

  return JoiSchema.validate(student);
};

exports.validateTeacher = (teacher) => {
  const JoiSchema = Joi.object({
    Name: Joi.string().min(5).max(30).required(),
    Gender: Joi.string().required(),
    DOB: Joi.date().required(),
    Subject: Joi.string().required(),
  }).options({ abortEarly: false });

  return JoiSchema.validate(teacher);
};
