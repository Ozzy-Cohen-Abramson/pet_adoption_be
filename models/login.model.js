const S = require("fluent-json-schema");

module.exports = S.object()
  .prop("userEmail", S.string().required().format(S.FORMATS.EMAIL))
  .prop("userPassword", S.string().required().minLength(6))
  .valueOf();
