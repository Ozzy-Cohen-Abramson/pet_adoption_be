const S = require("fluent-json-schema");

module.exports = S.object()
  .prop("user_id", S.number().required())
  .prop("user_pass", S.string().required().minLength(6))
  .prop("user_prev_pass", S.string().required().minLength(6))
  .valueOf();
