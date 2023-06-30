const express = require("express");
const passport = require("passport");

const router = express.Router();
const Movie = require("../../models/Movie");

const {
  getAllMovies,
  addMovie,
  addGenreToMovie,
  getMoviesByGenre,
} = require("./movie.controllers");

router.param("movieId", async (req, res, next, movieId) => {
  try {
    const movie = await Movie.findById(movieId);
    if (!movie)
      return res.status(404).json({
        msg: "There is not movie with this id",
      });
    req.movie = movie;
    next();
  } catch (error) {
    next(error);
  }
});

router.get("/", getAllMovies);

router.get("/:genre/movies", getMoviesByGenre);

router.post("/", passport.authenticate("jwt", { session: false }), addMovie);

router.post("/:movieId/:genreId", addGenreToMovie);

module.exports = router;
