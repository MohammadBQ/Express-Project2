const Movie = require("../../models/Movie");

exports.receiveListOfMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    next(error);
  }
};

// not complete
exports.createMovie = async (req, res, next) => {
  try {
    if (!req.user.isStaff) {
      return res
        .status(403)
        .json({ error: "Oops! Adding movies isn't in your script." });
      // 403 = Forbidden
    }
    const movie = await Movie.create(req.body);
    res.status(201).json(movie);
  } catch (error) {
    next(error);
  }
};
