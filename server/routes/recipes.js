const express = require("express");
const router = express.Router();
const Recipe = require("../models/Recipe");
const User = require("../models/User");
const verify = require("./verifyToken");
const upload = require("../services/ImageUpload");
const singleUpload = upload.single("image");

// Add recipe
router.post("/", verify, async (req, res) => {
  const {
    title,
    description,
    photo,
    ingredients,
    instructions,
    cookTime,
    prepTime,
    diet,
  } = req.body;

  const recipe = new Recipe({
    title: title,
    description: description,
    photo: photo,
    ingredients: ingredients,
    instructions: instructions,
    cookTime: cookTime,
    prepTime: prepTime,
    diet: diet,
    creator: req.user,
  });
  try {
    const savedRecipe = await recipe.save();
    res.send(recipe._id);
  } catch (err) {
    res.status(400).send(err);
  }
  User.findByIdAndUpdate(
    { _id: req.user._id },
    { $push: { recipes: recipe._id } },
    function (err, data) {
      if (data) {
        console.log(data);
      } else {
        console.log(err);
      }
    }
  );
});

// Delete a recipe
router.delete("/:username/:RecipeID", verify, async (req, res) => {
  User.findOneAndUpdate(
    { username: req.params.username },
    {
      $pull: { recipes: req.params.RecipeID },
    },
    { new: true },
    function (err, updatedUser) {
      if (updatedUser) {
        Recipe.findByIdAndDelete({ _id: req.params.RecipeID }, (err) => {
          if (!err) {
            res.json(updatedUser);
          } else {
            console.log(err);
          }
        });
      } else {
        console.log(err);
      }
    }
  );
});

// Upload image of recipe
router.post("/image-upload", verify, async (req, res) => {
  singleUpload(req, res, function (err) {
    if (err) {
      return res.status(422).send({
        errors: [{ title: "Image Upload Error", detail: err.message }],
      });
    }
    return res.json({ imageUrl: req.file.location });
  });
});

// Get 20 most recent recipes
router.get("/most-recent", verify, async (req, res) => {
  Recipe.find({})
    .sort({ createdAt: -1 })
    .limit(20)
    .exec((err, docs) => {
      if (err) console.log(err);
      res.json(docs);
    });
});

// Get single recipe
router.get("/:RecipeID", verify, async (req, res) => {
  Recipe.findOne({
    _id: req.params.RecipeID,
  })
    .then((singleRecipe) => {
      res.status(201).json(singleRecipe);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Request error: " + err);
    });
});

// Get all reviews of a recipe
router.get("/:RecipeID/rating", verify, async (req, res) => {
  Recipe.findOne({
    _id: req.params.RecipeID,
  })
    .populate("ratings")
    .then(function (rating) {
      res.json(rating);
    })
    .catch(function (err) {
      res.json(err);
    });
});

module.exports = router;