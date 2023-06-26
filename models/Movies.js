const { model, Schema } = require("mongoose");
// Everything with the word temp is a placeholder that you'll change in accordance with your project

const MovieSchema = new Schema({
  name: { type: String, unique: true, required: true },
  relaseDate: { type: String, required: true },
  review: String,
  ratings: { type: [Number], default: undefined },

  // create relations in here and in the other model
});

module.exports = model("Movie", MovieSchema);
