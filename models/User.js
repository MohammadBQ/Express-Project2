const { model, Schema } = require("mongoose");

const UserSchema = new Schema(
  {
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    email: { type: String },
    image: { type: String },
    isStaff: { type: Boolean },

    // create relations in here and in the other model
  },
  { timestamps: true }
);

module.exports = model("User", UserSchema);
