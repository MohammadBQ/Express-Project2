const { model, Schema } = require("mongoose");

const ActrosSchema = new Schema({
  name: { type: String, required: true },

  // create relations in here and in the other model
});

module.exports = model("Actros", ActrosSchema);
