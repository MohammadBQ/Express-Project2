const Genre = require("../../models/Genre");

exports.fetchGenreById = async (genreId) => {
  const genre = await Genre.findById(genreId);
  return genre;
};

exports.getAllGenres = async (req, res, next) => {
  try {
    // Populate here
    const genres = await Genre.find().populate("movies");
    return res.status(200).json(genres);
  } catch (error) {
    return next(error);
  }
};

exports.createGenre = async (req, res, next) => {
  try {
    if (!req.user.isStaff) {
      return res
        .status(403)
        .json({ error: "You don't have permission to perform this action" });
      // 403 = Forbidden
    }
    const newGenre = await Genre.create(req.body);
    return res.status(201).json(newGenre);
  } catch (error) {
    return next(error);
  }
};

exports.getGenreById = async (req, res, next) => {
  try {
    return res.status(200).json(req.genre);
  } catch (error) {
    return next(error);
  }
};

exports.updateGenreById = async (req, res, next) => {
  try {
    await req.genre.updateOne(req.body);
    return res.status(204).end();
  } catch (error) {
    return next(error);
  }
};

exports.deleteGenreById = async (req, res, next) => {
  try {
    await req.genre.deleteOne();
    return res.status(204).end();
  } catch (error) {
    return next(error);
  }
};

exports.deleteAllGenres = async (req, res, next) => {
  try {
    // Delete all
    await Genre.deleteMany({});
    return res.status(204).end();
  } catch (error) {
    return next(error);
  }
};
