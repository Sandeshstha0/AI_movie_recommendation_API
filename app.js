require("express-async-errors")

const express = require("express");
require("dotenv").config();

const mongoose = require("mongoose");
const addMovie = require("./controllers/addmovies");
const getSingleMovies = require("./controllers/getSingleMovie");
const getAllMovies = require("./controllers/getAllMovies");
const editMovie = require("./controllers/updateMovie");
const deleteMovie = require("./controllers/deleteMovie");
const movieRecommendation = require("./controllers/movieRecommendation");
const errorHandler = require("./handlers/errorHandler");

// Connection to mongodb..

mongoose
  .connect(process.env.mongo_connection, {})
  .then(() => {
    console.log("Connection to mongodb successful!");
  })
  .catch(() => {
    console.log("Connection to mongodb failed!");
  });

const app = express();



app.use(express.json());

// Models...
require("./models/movies.model");

// Routes...
app.post("/api/movies", addMovie);
app.get("/api/movies", getAllMovies);
app.get("/api/movies/:movie_id", getSingleMovies);
app.patch("/api/movies", editMovie);
app.delete("/api/movies/:movie_id", deleteMovie);

//Opem AI suggestion

app.get("/api/movies/openai/getRecommendations", movieRecommendation);

app.use(errorHandler);

app.listen(8000, () => {
  console.log("Server started successfully!");
});
