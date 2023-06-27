const express = require("express");
const { signin, signup, receiveListOfMovies } = require("./user.controllers");
const router = express.Router();
const passport = require("passport");
const uploader = require("../../middlewares/uploader");

router.param("userId", async (req, res, next, userId) => {
  try {
    const foundUser = await fetchTemp(userId);
    if (!foundUser) return next({ status: 404, message: "User not found" });
    req.temp = foundUser;
    next();
  } catch (error) {
    return next(error);
  }
});

//router.get("/", passport.authenticate("jwt", { session: false }), getUser);

router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);
router.post("/signup", uploader.single("image"), signup);

module.exports = router;

// router.post("/");
// router.put("/:userId", updateUser);
// router.delete("/:userId", deleteUser);
