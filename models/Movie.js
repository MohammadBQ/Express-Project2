const { model, Schema } = require("mongoose");

const MovieSchema = new Schema({
  name: { type: String, unique: true, required: true },
  relaseDate: { type: String, required: true },
  review: String,
  ratings: { type: [Number], default: undefined },

  // create relations in here and in the other model
});

module.exports = model("Movie", MovieSchema);
