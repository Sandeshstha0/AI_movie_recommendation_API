const { Configuration, OpenAIApi } = require("openai");
const mongoose = require("mongoose");
require("dotenv").config();

const movieRecommendation = async (req, res) => {
  const moviesModel = mongoose.model("movies");

  const allMovies = await moviesModel.find({});

  const moviesString = allMovies.map((el) => el.movie_name).join(",");

  const prompt = `I need a movie recommendation based on these movies : ${moviesString}. Provide me with 10 suggestions! seperate movies with comma`;

  console.log(prompt);

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 100,
    });

    res.status(200).json({
      suggestions: completion.data.choices[0].text,
    });
  } catch (e) {
    res.status(400).json({
      status: "failed",
      message: e.message,
    });
    return;
  }
};

module.exports = movieRecommendation;
