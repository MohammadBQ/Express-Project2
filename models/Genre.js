const { model, Schema } = require("mongoose");

const Movieschema = new Schema({
  name: { type: String, required: true },

  // create relations in here and in the other model
});

module.exports = model("Movie", Movieschema);
