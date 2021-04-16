const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
    name: String,
    ingredients: [
        {
            type: Object
        }
    ],
    instructions: String,
    image: String
})

const Recipe = mongoose.model("recipe", recipeSchema);
module.exports = Recipe;