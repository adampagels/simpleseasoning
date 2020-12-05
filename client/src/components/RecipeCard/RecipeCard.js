import React from "react";

const RecipeCard = ({ recipes, onClick, handleImageClick }) => {
  return (
    <div className="recipecard-container">
      {recipes &&
        recipes.map((recipes) => (
          <div className="recipecard-wrapper" key={recipes._id}>
            <img
              alt={recipes.title}
              className="recipecard-image"
              src={recipes.photo}
              onClick={() => handleImageClick(recipes._id)}
            />
            <h2>{recipes.title}</h2>
            <h3 onClick={() => onClick(recipes.creator._id)}>
              {recipes.creator.username}
            </h3>
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