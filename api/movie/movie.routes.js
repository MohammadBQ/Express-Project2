const express = require("express");
const Movie = require("../../models/Movie");
const router = express.Router();

const { receiveListOfMovies, createMovie } = require("./movie.controllers");

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

router.get("/", receiveListOfMovies);
router.post("/", createMovie);

module.exports = router;
