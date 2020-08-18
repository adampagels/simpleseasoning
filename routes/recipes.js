const express = require("express");
const router = express.Router();
const Recipe = require("../models/Recipe");
const User = require("../models/User");
const verify = require("./verifyToken");

router.post("/", verify, async (req, res) => {
  const {
    title,
    ingredients,
    instructions,
    cookTime,
    prepTime,
    diet,
  } = req.body;

  const recipe = new Recipe({
    title: title,
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

module.exports = router;
