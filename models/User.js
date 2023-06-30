const { model, Schema } = require("mongoose");

const UserSchema = new Schema(
  {
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    email: { type: String },
    image: { type: String },
    isStaff: { type: Boolean },

    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  },
  { timestamps: true }
);

module.exports = model("User", UserSchema);
