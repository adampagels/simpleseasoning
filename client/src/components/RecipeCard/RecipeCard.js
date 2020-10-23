import React from "react";

const RecipeCard = ({ recentRecipes }) => {
  return (
    <div className="recipecard-container">
      {recentRecipes &&
        recentRecipes.map((recipes) => (
          <div className="recipecard-wrapper">
            <img
              alt={recipes.title}
              className="recipecard-image"
              src={recipes.photo}
            />
            <h2>{recipes.title}</h2>
            <h3>{recipes.creator.username}</h3>
            <p>{recipes.description}</p>
            <p>
              {recipes.ratings.reduce((x, y) => x + y.stars, 0) /
                recipes.ratings.length +
                " " +
                `(${recipes.ratings.length})`}
            </p>
          </div>
        ))}
    </div>
  );
};

export default RecipeCard;
