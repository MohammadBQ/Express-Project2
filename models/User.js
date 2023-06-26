const { model, Schema } = require("mongoose");
// Everything with the word temp is a placeholder that you'll change in accordance with your project

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  email: { type: String },
  image: { type: String },
  isStaff: { type: Boolean },

  // create relations in here and in the other model
});

module.exports = model("User", UserSchema);
