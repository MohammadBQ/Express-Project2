const express = require("express");
const passport = require("passport");
const {
  getAllGenres,
  createGenre,
  getGenreById,
  updateGenreById,
  deleteGenreById,
  fetchGenreById,
  deleteAllGenres,
} = require("./genre.controllers");

const router = express.Router();
const signedIn = passport.authenticate("jwt", { session: false });

router.param("genreId", async (req, res, next, genreId) => {
  try {
    const foundGenre = await fetchGenreById(genreId);
    if (!foundGenre) return next({ status: 404, message: "genre not found" });
    req.genre = foundGenre;
    return next();
  } catch (error) {
    return next(error);
  }
});

router.get("/", signedIn, getAllGenres);

router.post("/", signedIn, createGenre);

router.get("/:genreId", signedIn, getGenreById);

router.put("/:genreId", signedIn, updateGenreById);

router.delete("/:genreId", signedIn, deleteGenreById);

router.delete("/", signedIn, deleteAllGenres);

module.exports = router;
