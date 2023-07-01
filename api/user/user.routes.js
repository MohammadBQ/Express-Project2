const express = require("express");
const {
  signin,
  signup,
  deleteUser,
  getUser,
  fetchUser,
  deleteAll,
} = require("./user.controllers");
const router = express.Router();
const passport = require("passport");
const uploader = require("../../middlewares/uploader");

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

router.get("/", passport.authenticate("jwt", { session: false }), getUser);
//router.get("/", getUser);

router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);
router.post("/signup", uploader.single("image"), signup);

router.delete("/:userId", deleteUser);

router.delete("/", deleteAll);

module.exports = router;

// router.post("/");
// router.put("/:userId", updateUser);
