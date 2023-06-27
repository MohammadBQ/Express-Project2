const express = require("express");
const { addCeleb } = require("./actor.controllers");
const router = express.Router();

router.post("/", addCeleb);

module.exports = router;
