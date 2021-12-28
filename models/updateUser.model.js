const S = require("fluent-json-schema");

module.exports = S.object()
  .prop("user_id", S.number().required())
  .prop("user_email", S.string().required().format(S.FORMATS.EMAIL))
  .prop("user_fn", S.string().required().minLength(2))
  .prop("user_family_name", S.string().required().minLength(2))
  .prop("user_phone", S.string().required().minLength(10).maxLength(10))
  .prop("user_pass", S.string().required().minLength(6))
  .prop("user_bio", S.string())
  .valueOf();
