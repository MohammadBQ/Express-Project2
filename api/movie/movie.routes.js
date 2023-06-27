const express = require("express");
const router = express.Router();

const { receiveListOfMovies } = require("./movie.controllers");

router.get("/", receiveListOfMovies);

module.exports = router;
