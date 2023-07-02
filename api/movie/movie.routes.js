const express = require("express");
const passport = require("passport");

const router = express.Router();
const Movie = require("../../models/Movie");

const {
  getAllMovies,
  addMovie,
  addGenreToMovie,
  getMoviesByGenre,
  deleteMovieById,
  getMovieById,
  deleteAll,
  getMoviesByActor,
} = require("./movie.controllers");

const signedIn = passport.authenticate("jwt", { session: false });

router.param("movieId", async (req, res, next, movieId) => {
  try {
    const movie = await Movie.findById(movieId).populate("reviews");
    if (!movie)
      return res.status(404).json({
        msg: "Sorry, no film in our archives matches that ID!",
      });
    req.movie = movie;
    next();
  } catch (error) {
    next(error);
  }
});

router.get("/", signedIn, getAllMovies);

router.get("/:movieId", signedIn, getMovieById);

router.delete("/:movieId", signedIn, deleteMovieById);

router.delete("/", signedIn, deleteAll);

router.post("/", signedIn, addMovie);

router.get("/:genre/movies", signedIn, getMoviesByGenre);

router.get("/:actor/actorname", signedIn, getMoviesByActor);

router.post("/:movieId/:genreId", signedIn, addGenreToMovie);

module.exports = router;
