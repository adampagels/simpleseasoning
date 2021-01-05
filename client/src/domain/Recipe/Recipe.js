import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { faStar, faHeart } from "@fortawesome/free-solid-svg-icons";
import {
  faStar as farStar,
  faCheckCircle as farCheckCircle,
  faHeart as farHeart,
} from "@fortawesome/free-regular-svg-icons";
import StarIcon from "../../components/Icon/StarIcon";
import CheckMarkIcon from "../../components/Icon/CheckMarkIcon";
import HeartIcon from "../../components/Icon/HeartIcon";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSingleRecipe,
  resetRecipeState,
} from "../../redux/slices/recipe/fetchSingleRecipe";

const Recipe = ({ location, history }) => {
  const [checkmark, setCheckmark] = useState([]);
  const { loading, hasErrors, recipe } = useSelector(
    (state) => state.fetchSingleRecipe
  );
  const dispatch = useDispatch();

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
    dispatch(fetchSingleRecipe(location.state.recipe));

    return () => {
      dispatch(resetRecipeState());
    };
  }, []);

  return (
    <>
      <div className="recipe-background"></div>
      {recipe && !loading && recipe.length !== 0 && (
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
                <StarIcon
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
              <div className="heart-icon-wrapper">
                <HeartIcon className={"recipe-heart"} regularIcon={farHeart} />
              </div>
              <img
                className="recipe-image"
                alt={recipe.title}
                src={recipe.photo}
              />
            </div>
            <div className="recipe-ingredients-wrapper">
              <h2 className="recipe-ingredients-header">Ingredients:</h2>
              {recipe.ingredients.map((ingredient, index) => (
                <div className="recipe-icon-ingredient-wrapper" key={index}>
                  <CheckMarkIcon
                    regularIcon={farCheckCircle}
                    className={
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
