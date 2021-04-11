const mongoose = require("mongoose");
const Recipe = require("./Recipe.model");

const connection = "mongodb://localhost:27017/recipe-db";
const connectDb = () => {
    return mongoose.connect(connection);
}

module.exports = connectDb;
