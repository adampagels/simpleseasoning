const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
    },
    description: {
      type: String,
    },
    ingredients: {
      type: String,
    },
    instructions: {
      type: String,
    },
    cookTime: {
      type: String,
    },
    prepTime: {
      type: String,
    },
    diet: {
      type: [String],
    },
    ratings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Rating",
      },
    ],
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Recipe = mongoose.model("Recipe", RecipeSchema);

module.exports = Recipe;
