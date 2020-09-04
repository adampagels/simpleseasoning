const express = require("express");
const router = express.Router();
const Recipe = require("../models/Recipe");
const Rating = require("../models/Rating");
const verify = require("./verifyToken");

router.post("/:RecipeID", verify, async (req, res) => {
  const { stars } = req.body;

  const rating = new Rating({
    stars: stars,
    user: req.user,
  });
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
        console.log(data);
      } else {
        console.log(err);
      }
    }
  );
});

module.exports = router;
