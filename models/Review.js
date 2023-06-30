const { model, Schema } = require("mongoose");

const ReviewSchema = new Schema(
  {
    text: String,
    user: { type: Schema.Types.ObjectId, ref: "User" },
    movie: { type: Schema.Types.ObjectId, ref: "Movie" },
  },
  { timestamps: true }
);
module.exports = model("Review", ReviewSchema);
