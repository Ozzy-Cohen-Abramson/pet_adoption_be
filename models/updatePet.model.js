const S = require("fluent-json-schema");

module.exports = S.object()
  .prop("pet_id", S.number().required())
  .prop("pet_name", S.string().required())
  .prop("pet_weight", S.number().required())
  .prop("pet_height", S.number().required())
  .prop("pet_color", S.string().required())
  .prop("pet_breed", S.string().required())
  .prop("pet_dietry", S.string().required())
  .prop("pet_hypo", S.string().required())
  .prop("pet_bio", S.string().required())
  .valueOf();
