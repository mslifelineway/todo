const Joi = require("joi");

const taskSchema = Joi.object().keys({
  title: Joi.string().required("Title is required"),
  description: Joi.string().required("Description is required"),
  dueDate: Joi.string().required("dueDate is required"),
  status: Joi.string().required("Status is required"),
});

exports.validateCreateTaskPayload = async (req, res, next) => {
  const { error } = taskSchema.validate(req.payload);
  console.log(error);
  if (!error) {
    next();
  } else {
    res.status(422).json({
      message: error,
    });
  }
};

const updateSchema = Joi.object().keys({
  title: Joi.string(),
  description: Joi.string(),
  dueDate: Joi.string(),
  status: Joi.string(),
});

exports.validateUpdateTaskPayload = async (req, res, next) => {
  const { error } = updateSchema.validate(req.payload);
  console.log(error);
  if (!error) {
    next();
  } else {
    res.status(422).json({
      message: error,
    });
  }
};
exports.validateId = async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    next();
  } else {
    res.status(422).json({
      message: "Id is missing",
    });
  }
};
