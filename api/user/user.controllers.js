const User = require("../../models/User");
const passHash = require("../../utils/auth/passhash");
const generateToken = require("../../utils/auth/generateToken");
const passhash = require("../../utils/auth/passhash");

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
    //check if movie exists

    // find the user and update watchlist

    //check if movie is already in watchlist

    //add movie to watchlist
  } catch (error) {
    next(error);
  }
};

exports.getWatchList = async (req, res, next) => {
  try {
    // Find the user and populate the movies in the watchlist
  } catch (error) {}
};
