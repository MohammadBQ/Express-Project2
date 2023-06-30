//imports
const express = require("express");
const connectDb = require("./database");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const notFound = require("./middlewares/notFoundHandler");
const errorHandler = require("./middlewares/errorHandler");

const userRoutes = require("./api/user/user.routes");
const movieRoutes = require("./api/movie/movie.routes");
const actorRoutes = require("./api/actor/actor.routes");
const reviewRoutes = require("./api/review/review.routes");
const genreRoutes = require("./api/Genre/genre.routes");
const config = require("./config/keys");
const passport = require("passport");
const { localStrategy, jwtStrategy } = require("./middlewares/passport");

//require("dotenv").config();

//setup
const app = express();

// middlewares before routes
app.use(cors());
connectDb();
app.use(express.json());
app.use(morgan("dev"));

//passport
app.use(passport.initialize());
passport.use("local", localStrategy);
passport.use(jwtStrategy);

//routes
app.use("/media", express.static(path.join(__dirname, "media")));
app.use("/user", userRoutes);
app.use("/movie", movieRoutes);
app.use("/genre", genreRoutes);
app.use("/actor", actorRoutes);
app.use("/reviews", reviewRoutes);

// middlewares after routes
app.use(notFound);
app.use(errorHandler);

//run server

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`App running on PORT:${PORT}`);
});

// app.listen(config.PORT, () => {
//   console.log(`The application is running on ${config.PORT}`);
// });

module.exports = app;
