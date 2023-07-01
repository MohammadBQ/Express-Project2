const { model, Schema } = require("mongoose");

const ReviewSchema = new Schema(
  {
    text: String,
    ratings: { type: [Number], default: undefined },

    user: { type: Schema.Types.ObjectId, ref: "User" },
    movie: { type: Schema.Types.ObjectId, ref: "Movie" },
  }
  //{ timestamps: true }
);
module.exports = model("Review", ReviewSchema);
