const S = require("fluent-json-schema");

module.exports = S.object()
  .prop("userEmail", S.string().required().format(S.FORMATS.EMAIL))
  .prop("userFirstName", S.string().required().minLength(2))
  .prop("userLastName", S.string().required().minLength(2))
  .prop("userPhone", S.string().required().minLength(10).maxLength(10))
  .prop("userPassword", S.string().required().minLength(6))
  .valueOf();
