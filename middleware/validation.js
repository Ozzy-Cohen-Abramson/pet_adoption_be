const Ajv = require("ajv").default;
const ajv = new Ajv();
const addFormats = require("ajv-formats");
addFormats(ajv);

module.exports.validationMid = (schema) => {
  return (req, res, next) => {
    try {
      const validate = ajv.compile(schema);
      const valid = validate(req.body);
      if (!valid) return res.status(400).send(validate.errors);
      next();
    } catch (error) {
      res.status(400).send(error.message);
    }
  };
};
