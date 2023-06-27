const { model, Schema } = require("mongoose");

const MovieSchema = new Schema(
  {
    name: { type: String, unique: true, required: true },
    releaseDate: { type: Date, required: true },

    ratings: { type: [Number], default: undefined },

    genres: [{ type: Schema.Types.ObjectId, ref: "Genre" }],
    actors: [{ type: Schema.Types.ObjectId, ref: "Actor" }],
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  },
  { timestamps: true }
);

module.exports = model("Movie", MovieSchema);
