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
            <p
              className="recipe-creator"
              onClick={() => handleUserClick(recipe.creator._id)}
            >
              By: {recipe.creator.username}
            </p>
            <div className="recipe-timing-rating-wrapper">
              <div className="recipe-preptime-wrapper">
                <p className="recipe-preptime-header">Prep Time:</p>
                <p className="recipe-preptime">{recipe.prepTime}</p>
              </div>
              <div className="recipe-cooktime-wrapper">
                <p className="recipe-cooktime-header">Cook Time:</p>
                <p className="recipe-cooktime">{recipe.cookTime}</p>
              </div>
              <p className="recipe-ratings">
                {recipe.ratings.reduce((x, y) => x + y.stars, 0) /
                  recipe.ratings.length +
                  " " +
                  `(${recipe.ratings.length})`}
              </p>
            </div>
            <p className="recipe-description">{recipe.description}</p>
            {recipe.diet.map((diet, index) => (
              <p className="recipe-diet" key={index}>
                {diet}
              </p>
            ))}
            <h2 className="recipe-instructions-header">Instructions: </h2>
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
            <h2 className="recipe-ingredients-header">Ingredients:</h2>
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
