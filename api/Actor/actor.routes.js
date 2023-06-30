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
} = require("./actor.controllers");
const router = express.Router();

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

router.get("/", getAllActors);
router.post("/", passport.authenticate("jwt", { session: false }), addCeleb);
router.get("/:actorId", getActorById);
router.put("/:actorId", updateActorById);
router.delete("/:actorId", deleteActorById);

router.post("/:actorId/:movieId", addMovieToActor);

module.exports = router;
