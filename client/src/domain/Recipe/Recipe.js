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
        <div>
          <h1>{recipe.title}</h1>
          <p>
            {recipe.ratings.reduce((x, y) => x + y.stars, 0) /
              recipe.ratings.length +
              " " +
              `(${recipe.ratings.length})`}
          </p>
          <p>{recipe.description}</p>
          <p>{recipe.diet}</p>
          <p onClick={() => handleUserClick(recipe.creator._id)}>
            By: {recipe.creator.username}
          </p>
          <img alt={recipe.title} className="recipe-image" src={recipe.photo} />
          <p>{recipe.ingredients}</p>
          <p>Instructions: {recipe.instructions}</p>
          <p>Cook Time: {recipe.cookTime}</p>
          <p>Prep Time:{recipe.prepTime}</p>
        </div>
      )}
    </div>
  );
};

export default withRouter(Recipe);
