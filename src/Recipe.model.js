const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
    name: String,
    ingredients: [
        {
        amount: String,
        ingrerient: String
        }
    ],
    instructions: String
})

recipeSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;