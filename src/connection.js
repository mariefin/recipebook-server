const mongoose = require("mongoose");
const Recipe = require("./Recipe.model");

// const connection = "mongodb://localhost:27017/recipe-db";
const connection = "mongodb://mongo:27017/recipe-db";
const connectDb = () => {
    return mongoose.connect(connection, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
}

module.exports = connectDb;
