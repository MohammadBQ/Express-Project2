const Genre = require("../../models/Genre");
const Movie = require("../../models/Movie");

exports.getAllMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find().populate("genres");
    res.json(movies);
  } catch (error) {
    next(error);
  }
};

exports.addMovie = async (req, res, next) => {
  try {
    if (!req.user.isStaff) {
      return res
        .status(403)
        .json({ error: "Oops! Adding movies isn't in your script." });
      // 403 = Forbidden
    }
    const movie = await Movie.create(req.body);
    res.status(201).json(movie);
    next(error);
  } catch (error) {
    next(error);
  }
};

exports.addGenreToMovie = async (req, res, next) => {
  try {
    const { genreId } = req.params; // i can create a route.param
    const genre = await Genre.findById(genreId);

    await Movie.findByIdAndUpdate(req.movie._id, {
      $push: { genres: genre._id },
    }); // so we are takeing the tag and put it in the post

    await Genre.findByIdAndUpdate(genreId, {
      $push: { movies: req.movie._id },
    });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.getMoviesByGenre = async (req, res, next) => {
  try {
    const genreName = req.params.genre;
    //fetch the genre document by its name
    const genre = await Genre.findOne({ name: genreName });
    if (!genre) {
      return res.status(404).json({ error: "Genre not found" });
    }

    // Then, fetch all movies that reference this genre
    const movies = await Movie.find({ genres: genre._id });

    // Lastly, send the movies back in the response
    res.status(200).json(movies);
  } catch (error) {
    next(error);
  }
};
