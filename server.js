const express = require("express");
const app = express();
const connectDb = require("./src/connection");
const PORT = 8080;
const Recipe = require("./src/Recipe.model");
const cors = require("cors");

app.use(cors());

app.get("/recipes", async (req, res) => {
  const recipes = await Recipe.find();
  res.json(recipes);
});

app.get("/recipe-create", async (req, res) => {
  const recipe = new Recipe({ name: "Testi", ingredients: [{ amount: "3", ingredient: "Milk"}], instruction: "Test test test test test test test" });
  await recipe.save().then(() => console.log("recipe created"));
  res.send("Recipe created \n");
});


app.listen(PORT, () => {
    console.log(`Running on ${PORT}`);

    connectDb().then(() => {
      console.log("MongoDb connected");
    })
});

