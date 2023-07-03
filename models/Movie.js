const { model, Schema } = require("mongoose");

const MovieSchema = new Schema(
  {
    name: { type: String, required: true },
    releaseDate: { type: Date, required: true },
    ratings: { type: [Number], default: undefined },

    //relations
    genres: [{ type: Schema.Types.ObjectId, ref: "Genre" }],
    actors: [{ type: Schema.Types.ObjectId, ref: "Actor" }],
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],

    avgRating: { type: Number, default: 0 },
  }
  // { timestamps: true }
);

module.exports = model("Movie", MovieSchema);
