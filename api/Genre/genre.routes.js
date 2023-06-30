const express = require("express");
const passport = require("passport");
const {
  getAllGenres,
  createGenre,
  getGenreById,
  updateGenreById,
  deleteGenreById,
  fetchGenreById,
} = require("./genre.controllers");

const router = express.Router();

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

router.get("/", getAllGenres);

router.post("/", passport.authenticate("jwt", { session: false }), createGenre);
router.get("/:genreId", getGenreById);
router.put("/:genreId", updateGenreById);
router.delete("/:genreId", deleteGenreById);

module.exports = router;
