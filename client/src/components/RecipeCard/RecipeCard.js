import React from "react";

const RecipeCard = ({ recentRecipes }) => {
  return (
    <>
      {recentRecipes &&
        recentRecipes.map((recipes) => (
          <>
          {console.log(recipes)}
        <img src={recipes.photo} />
        <h1>{recipes.title}</h1>
        </>
        ))}
    </>
  );
};

export default RecipeCard;
