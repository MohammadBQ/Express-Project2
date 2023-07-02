const express = require("express");
const {
  signin,
  signup,
  deleteUser,
  getUser,
  fetchUser,
  deleteAll,
  addMOvieToWatchList,
  getWatchList,
  markedAsWatched,
} = require("./user.controllers");
const router = express.Router();
const passport = require("passport");
const uploader = require("../../middlewares/uploader");
const signedIn = passport.authenticate("jwt", { session: false });

router.param("userId", async (req, res, next, userId) => {
  try {
    const foundUser = await fetchUser(userId);
    if (!foundUser) return next({ status: 404, message: "User not found" });
    req.user = foundUser;
    next();
  } catch (error) {
    return next(error);
  }
});

router.get("/", signedIn, getUser);
//router.get("/", getUser);

router.post("/signin", signedIn, signin);
router.post("/signup", uploader.single("image"), signup);

router.delete("/:userId", deleteUser);

router.delete("/", deleteAll);

//watchlist
router.post("/:userId/watchlist/:movieId", signedIn, addMOvieToWatchList);
router.get("/my-watchlist", signedIn, getWatchList);
router.put("/watchlist/:movieId", signedIn, markedAsWatched);

module.exports = router;

// router.post("/");
// router.put("/:userId", updateUser);
