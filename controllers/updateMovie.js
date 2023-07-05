const mongoose = require("mongoose");

const editMovie = async (req, res) => {
  const moviesModel = mongoose.model("movies");

  const { movie_id, movie_name, rating, info, description } = req.body;

  try {
    if (!movie_id) throw "Movie ID is requird!";
  } catch (e) {
    res.status(400).json({
      status: "failed",
      message: e,
    });
    return;
  }

  try {
    await moviesModel.updateOne(
      {
        _id: movie_id,
      },
      {
        movie_name: movie_name,
        rating: rating,
        info: info,
        description: description,
      },
      {
        runValidators: true,
      }
    );
  } catch (e) {
    res.status(400).json({
      status: "failed",
      message: e.message,
    });
    return;
  }

  res.status(200).json({
    status: "Success",
    message: "Movie update successfully",
  });
};

module.exports = editMovie;
