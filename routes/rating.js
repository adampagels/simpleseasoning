const express = require("express");
const router = express.Router();
const Recipe = require("../models/Recipe");
const Rating = require("../models/Rating");
const User = require("../models/User");
const verify = require("./verifyToken");

// Post a rating of a recipe
router.post("/:RecipeID", verify, async (req, res) => {
  const { stars } = req.body;

  const rating = new Rating({
    stars: stars,
    recipe: req.params.RecipeID,
    user: req.user,
  });

  const recipeIdExist = await Recipe.findOne({ _id: req.params.RecipeID });
  if (!recipeIdExist) return res.status(400).send("Recipe does not exist");

  try {
    const savedRating = await rating.save();
    res.send(rating._id);
  } catch (err) {
    res.status(400).send(err);
  }
  Recipe.findByIdAndUpdate(
    { _id: req.params.RecipeID },
    { $push: { ratings: rating._id } },
    function (err, data) {
      if (data) {
        User.findByIdAndUpdate(
          { _id: req.user._id },
          { $push: { ratings: req.params.RecipeID } },
          function (err, data) {
            if (data) {
              console.log(data);
            } else {
              console.log(err);
            }
          }
        );
      } else {
        console.log(err);
      }
    }
  );
});

// Edit rating of a recipe
router.put("/:RecipeID", verify, async (req, res) => {
  const { stars } = req.body;

  Rating.findOne({ recipe: req.params.RecipeID, user: req.user._id }).exec(
    function (err, rating) {
      if (err) throw err;
      if (rating) {
        rating.stars = stars;
        rating.save();
        res.json(rating);
      } else {
        res.status(400).send(err);
      }
    }
  );
});

module.exports = router;
