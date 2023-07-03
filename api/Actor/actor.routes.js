const express = require("express");
const passport = require("passport");
const {
  addCeleb,
  fetchActorById,
  getAllActors,
  getActorById,
  updateActorById,
  deleteActorById,
  addMovieToActor,
  deleteAllActors,
} = require("./actor.controllers");
const router = express.Router();
const signedIn = passport.authenticate("jwt", { session: false });

router.param("actorId", async (req, res, next, actorId) => {
  try {
    const foundActor = await fetchActorById(actorId);
    if (!foundActor) return next({ status: 404, message: "actor not found" });
    req.actor = foundActor;
    return next();
  } catch (error) {
    return next(error);
  }
});

router.get("/", signedIn, getAllActors);

router.post("/", signedIn, addCeleb);

router.get("/:actorId", signedIn, getActorById);

router.put("/:actorId", signedIn, updateActorById);

router.delete("/:actorId", signedIn, deleteActorById);

router.delete("/", signedIn, deleteAllActors);

router.post("/:actorId/:movieId", addMovieToActor);

module.exports = router;
