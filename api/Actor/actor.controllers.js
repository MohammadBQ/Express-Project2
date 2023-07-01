const Actor = require("../../models/Actor");
const Movie = require("../../models/Movie");

exports.fetchActorById = async (actorId) => {
  const actor = await Actor.findById(actorId);
  return actor;
};

exports.getAllActors = async (req, res, next) => {
  try {
    // Populate
    const actors = await Actor.find().populate("movies");
    return res.status(200).json(actors);
  } catch (error) {
    return next(error);
  }
};

exports.addCeleb = async (req, res, next) => {
  try {
    // To ensure the user is a staff member
    if (!req.user.isStaff) {
      return res
        .status(403)
        .json({ error: "You don't have permission to perform this action" });
    }
    const newCeleb = await Actor.create(req.body);
    res.status(201).json(newCeleb);
    next(error);
  } catch (error) {
    next(error);
  }
};

exports.getActorById = async (req, res, next) => {
  try {
    return res.status(200).json(req.actor);
  } catch (error) {
    return next(error);
  }
};

exports.updateActorById = async (req, res, next) => {
  try {
    await req.actor.updateOne(req.actor);
    return res.status(204).end();
  } catch (error) {
    return next(error);
  }
};

exports.deleteActorById = async (req, res, next) => {
  try {
    await req.actor.deleteOne();
    return res.status(204).end();
  } catch (error) {
    return next(error);
  }
};
exports.deleteAllActors = async (req, res, next) => {
  try {
    // Delete all actors
    await Actor.deleteMany({});
    return res.status(204).end();
  } catch (error) {
    return next(error);
  }
};

exports.addMovieToActor = async (req, res, next) => {
  try {
    const { movieId } = req.params; // i can create a route.param
    const movie = await Movie.findById(movieId);

    await Actor.findByIdAndUpdate(req.actor._id, {
      $push: { movies: movie._id },
    }); // so we are takeing the actor and put it in the movie

    await Movie.findByIdAndUpdate(movieId, {
      $push: { actors: req.actor._id },
    });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
