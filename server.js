const express = require("express");
const app = express();
const connectDb = require("./src/connection");
const PORT = 8080;
const Recipe = require("./src/Recipe.model");
const cors = require("cors");

app.use(cors());

app.use(express.urlencoded({
  limit: '15mb',
  extended: true
})); 
app.use(express.json({limit: '15mb', extended: true}));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", true);
  next();
})

app.get("/recipes", async (req, res) => {
  const recipes = await Recipe.find();
  res.json(recipes);
});

app.post("/recipe-create", async (req, res) => {
  const newrecipe = new Recipe({ name: req.body.body.name, 
    instructions: req.body.body.instructions, 
    image: req.body.body.image, 
    ingredients: req.body.body.ingredients,
    ingress: req.body.body.ingress });
  newrecipe.save().then(() => console.log("recipe created"));
  res.send("Recipe created \n");
});

app.post('/recipes/single', async (req, res) =>{
  const recipe = Recipe.findOne({name: req.body.name});
  res.json(recipe);
});

app.delete("/delete-recipe/:id", (req, res) => {
  Recipe.findByIdAndRemove(req.params.id)
    .then(result => {
      res.json({success: true})
    })
    .catch(error => console.log(error))
})

app.post('/update-recipe/:id', (req, res) => {
  Recipe.findOneAndUpdate(
    {_id: req.body.body.id},
    {
      $set: {
        name: req.body.body.name, 
        instructions: req.body.body.instructions, 
        image: req.body.body.image, 
        ingredients: req.body.body.ingredients,
        ingress: req.body.body.ingress
      },
    },
    { new: true},
  ).then(info => {
    res.json(info)
  }).catch(err => res.status(400).json({msg: 'Update failed'})) 
})

app.get('/files', (req, res) => {
  gfs.files.find().toArray((err, files) => {
    if (!files || files.length === 0) {
      return res.status(404).json({
        err: 'No files exist'
      });
    }
  });
});

app.get('/files/:filename', (req, res) => {
  gfs.files.findOne({filename: req.params.filename}, (err, file) => {
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No files'
      });
    }
    return res.json(file);
  });
});

app.get('/image/:filename', (req, res) => {
  gfs.files.findOne({filename: req.params.filename}, (err, file) => {
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file'
       });
    }
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/jpg' || file.contentType === 'image/png') {
    const readstream = gfs.createReadStream(file.filename);
    readstream.pipe(res);
    } else {
      res.status(404).json({
        err: 'Not an image'
      });
    }
  });
});

app.listen(PORT, () => {
    console.log(`Running on ${PORT}`);

    connectDb().then(() => {
      console.log("MongoDb connected");
    })
});

