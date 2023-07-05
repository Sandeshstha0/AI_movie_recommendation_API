const mongoose = require("mongoose");

const deleteMovie = async (req, res) => {
  const moviesModel = mongoose.model("movies");

  const movie_id = req.params.movie_id;

  const getMovie = await moviesModel.findOne({
    _id: movie_id,
  });

  try {
    if (!getMovie) throw "Movie doesnot exist";
  } catch (e) {
    res.status(400).json({
      status: "failed",
      message: e,
    });
    return;
  }

  try {
    await moviesModel.deleteOne({
      _id: movie_id,
    });
  } catch (e) {
    res.status(400).json({
      status: "failed",
      message: e.message,
    });
    return;
  }

  res.status(200).json({
    status: "success",
    message: "Movie is successfully deleted",
  });
};

module.exports = deleteMovie;
