const { model, Schema } = require("mongoose");

const ActorSchema = new Schema(
  {
    name: { type: String, required: true },
    movies: [{ type: Schema.Types.ObjectId, ref: "Movie" }],
  }
  //{ timestamps: true }
);

module.exports = model("Actor", ActorSchema);
