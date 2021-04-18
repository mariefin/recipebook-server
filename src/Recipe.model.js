const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
    name: String,
    ingredients: [
        {
            type: Object
        }
    ],
    instructions: [
        {
            type: Object
        }
    ],
    image: String,
    ingress: String
})

const Recipe = mongoose.model("recipe", recipeSchema);
module.exports = Recipe;