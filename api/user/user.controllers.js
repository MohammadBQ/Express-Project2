const User = require("../../models/User");
const passHash = require("../../utils/auth/passhash");
const generateToken = require("../../utils/auth/generateToken");
const passhash = require("../../utils/auth/passhash");
const Movie = require("../../models/Movie");

exports.fetchUser = async (userId, next) => {
  try {
    const user1 = await User.findById(userId);
    return user1;
  } catch (error) {
    return next(error);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const users = await User.find().select("-__v").populate("reviews");
    return res.status(200).json(users);
  } catch (error) {
    return next(error);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const { password } = req.body;
    req.body.password = await passHash(password);
    const newUser = await User.create(req.body);
    const token = generateToken(newUser);
    res.status(201).json({ token });
  } catch (err) {
    next(error);
  }
};

exports.signin = async (req, res, next) => {
  try {
    const token = generateToken(req.user);
    console.log(token);
    return res.status(200).json({ token });
  } catch (err) {
    next(error);
  }
};

exports.signup = async (req, res, next) => {
  try {
    const { password } = req.body;
    req.body.password = await passhash(password);
    const newUser = await User.create(req.body);
    const token = generateToken(newUser);
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, req.body);
    return res.status(204).end();
  } catch (error) {
    return next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndRemove({ _id: req.user.id });
    return res.status(204).end();
  } catch (error) {
    return next(error);
  }
};

exports.deleteAll = async (req, res, next) => {
  try {
    // Delete all
    await User.deleteMany({});
    return res.status(204).end();
  } catch (error) {
    return next(error);
  }
};

exports.addMOvieToWatchList = async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const user = req.user;

    //check if movie exists
    const foundMovie = await Movie.findById({ _id: movieId });

    if (!foundMovie) return next({ status: 404, message: "Movie not found" });

    //  update watchlist

    //check if movie is already in watchlist
    const movieInWatchlist = user.watchlist.find(
      (item) => item.movie.toString() === movieId
    );

    if (movieInWatchlist) {
      return res.status(400).json({ error: "Movie is already in watchlist" });
    }

    //add movie to watchlist

    //req.body.movie = foundMovie._id;

    user.watchlist.push({ movie: movieId, watched: false });

    await user.save();
    // Populate movie details

    await user.populate("watchlist.movie", "name");

    // Select the user fields without reviews
    const userWithSelectedFields = await User.findById(user._id).select(
      "-reviews"
    );

    res.status(200).json(userWithSelectedFields);
  } catch (error) {
    next(error);
  }
};

exports.getWatchList = async (req, res, next) => {
  try {
    // Populate the movie field in the watchlist
    const user = await User.findById(req.user._id).populate(
      "watchlist.movie",
      "name -_id"
    );
    res.status(200).json(user.watchlist);
  } catch (error) {
    next(error);
  }
};
exports.markedAsWatched = async (req, res, next) => {
  try {
    const { movieId } = req.params;

    // console.log("Watchlist:", req.user.watchlist);
    // console.log("Movie ID:", movieId);

    const movieInWatchlist = req.user.watchlist.find((item) =>
      item.movie.equals(movieId)
    );

    if (!movieInWatchlist) {
      return next({ status: 404, message: "Movie not in watchlist" });
    }

    movieInWatchlist.watched = true;

    res.status(200).json({
      message: "Pop the popcorn! Marked as watched!",
    });
  } catch (error) {
    next(error);
  }
};
