const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
    movie_id : String,
    name : String,
    price : Number,
    heroName : String,
    heroinName : String
});

const movieModel = mongoose.model("movieDetail",movieSchema,"movieDetail");

module.exports = movieModel;