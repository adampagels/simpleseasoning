import React, { useState, useEffect } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { faStar, faHeart } from "@fortawesome/free-solid-svg-icons";
import {
  faStar as farStar,
  faCheckCircle as farCheckCircle,
} from "@fortawesome/free-regular-svg-icons";
import Icon from "../../components/Icon/Icon";

const Recipe = ({ location, history }) => {
  const [checkmark, setCheckmark] = useState([]);
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

  const toggleCheckmark = (ingredientIndex) => {
    if (checkmark.includes(ingredientIndex)) {
      setCheckmark(
        checkmark.filter((ingredient) => ingredient !== ingredientIndex)
      );
    } else {
      let newCheckmark = [...checkmark];
      newCheckmark.push(ingredientIndex);
      setCheckmark(newCheckmark);
    }
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
    <>
      <div className="recipe-background"></div>
      {recipe && (
        <div className="recipe-container">
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
              <div className="recipe-totaltime-wrapper">
                <p className="recipe-totaltime-header">Total Time:</p>
                <p className="recipe-totaltime">
                  {Number(recipe.prepTime) + Number(recipe.cookTime)}
                </p>
              </div>
              <div className="recipe-ratings-wrapper">
                <p className="recipe-ratings-header">
                  {recipe.ratings.length} ratings
                </p>
                <Icon
                  className={"recipe-star"}
                  solidIcon={faStar}
                  regularIcon={farStar}
                  ratings={recipe.ratings}
                />
              </div>
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
            <div className="recipe-image-wrapper">
              <Icon
                className={"recipe-heart"}
                regularIcon={faHeart}
                ratings={recipe.ratings}
              />
              <img
                className="recipe-image"
                alt={recipe.title}
                src={recipe.photo}
              />
            </div>
            <div className="recipe-ingredients-wrapper">
              <h2 className="recipe-ingredients-header">Ingredients:</h2>
              {recipe.ingredients.map((ingredient, index) => (
                <div className="recipe-icon-ingredient-wrapper">
                  <Icon
                    secondRegularIcon={farCheckCircle}
                    secondClassName={
                      checkmark.includes(index)
                        ? "recipe-checkmark-checked"
                        : "recipe-checkmark-unchecked"
                    }
                    onClick={() => toggleCheckmark(index)}
                  />
                  <p className="recipe-ingredients" key={index}>
                    {ingredient}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default withRouter(Recipe);
