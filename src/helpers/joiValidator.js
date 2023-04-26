const Joi = require("joi");
// set label false as default for all schemas
const JoiInstance = Joi.defaults((schema) => {
  return schema.options({
    errors: {
      wrap: {
        label: false,
      },
    },
  });
});

module.exports = class JoiValidator {
  //user schema
  static userSchema(body) {
    const schema = JoiInstance.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(7).max(30).required(),
    });

    const { error } = schema.validate(body);
    if (error) {
      return { error: true, message: error.message };
    }
  }

  //post schema

  static postSchema(body) {
    const schema = JoiInstance.object().keys({
      title: Joi.string().min(8).required(),
      description: Joi.string().min(8).required(),
    });

    const { error } = schema.validate(body);
    if (error) {
      return { error: true, message: error.message };
    }
  }
  static idSchema(body) {
    console.log(body)
    const schema = JoiInstance.object().keys({
      id: Joi.number().exist().required()
    });

    const { error } = schema.validate(body);
    if (error) {
      return { error: true, message: error.message };
    }
  }
  static commentScema(body) {
    const schema = JoiInstance.object().keys({
      content: Joi.string().min(8).exist().required()
    });

    const { error } = schema.validate(body);
    if (error) {
      return { error: true, message: error.message };
    }
  }
};
