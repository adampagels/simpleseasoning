import React, { useState, useEffect } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

const Recipe = ({ location, history }) => {
  const [recipe, setRecipe] = useState("");
  const getRecipe = () => {
    const accessToken = localStorage.getItem("auth-token");
    axios
      .get(`http://localhost:5000/recipes/${location.state.recipe}`, {
        headers: {
          "auth-token": `${accessToken}`,
        },
      })
      .then((userData) => {
        setRecipe(userData.data);
      });
  };

  const handleUserClick = (value) => {
    history.push({
      pathname: `/user/${value}`,
      state: {
        user: `${value}`,
      },
    });
  };

  useEffect(() => {
    getRecipe();
  }, []);

  return (
    <div className="recipe-container">
      {recipe && (
        <>
          <div className="recipe-left-div">
            <h1 className="recipe-title">{recipe.title}</h1>
            <p className="recipe-ratings">
              {recipe.ratings.reduce((x, y) => x + y.stars, 0) /
                recipe.ratings.length +
                " " +
                `(${recipe.ratings.length})`}
            </p>
            <p className="recipe-description">{recipe.description}</p>
            {recipe.diet.map((diet, index) => (
              <p className="recipe-diet" key={index}>
                {diet}
              </p>
            ))}
            <p
              className="recipe-creator"
              onClick={() => handleUserClick(recipe.creator._id)}
            >
              By: {recipe.creator.username}
            </p>
            <p className="recipe-cooktime">Cook Time: {recipe.cookTime}</p>
            <p className="recipe-preptime">Prep Time:{recipe.prepTime}</p>
            <p className="recipe-instructions-header">Instructions: </p>
            {recipe.instructions.map((instruction, index) => (
              <p className="recipe-instructions" key={index}>
                {"Step" + " " + (index + 1) + " " + instruction}
              </p>
            ))}
          </div>
          <div className="recipe-right-div">
            <img
              className="recipe-image"
              alt={recipe.title}
              src={recipe.photo}
            />
            <p className="recipe-ingredients-label">Ingredients:</p>
            {recipe.ingredients.map((ingredient, index) => (
              <p className="recipe-ingredients" key={index}>
                {ingredient}
              </p>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default withRouter(Recipe);
