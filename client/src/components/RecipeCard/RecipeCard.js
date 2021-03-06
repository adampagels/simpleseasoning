import React from "react";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import StarIcon from "../../components/Icon/StarIcon";

const RecipeCard = ({ recipes, onClick, handleImageClick }) => {
  const imagePlaceholder = process.env.PUBLIC_URL + "/imagePlaceholder.jpg";
  const descriptionPlaceholder = "No recipe description available.";
  return (
    <div className="recipecard-container">
      {recipes &&
        recipes.map((recipes) => (
          <div
            className="recipecard-wrapper"
            key={recipes._id}
            onClick={() => handleImageClick(recipes._id)}
          >
            <div className="recipecard-image-wrapper">
              <img
                alt={recipes.title}
                className="recipecard-image"
                src={recipes.photo ? recipes.photo : imagePlaceholder}
              />
            </div>
            <div class="recipecard-info">
              <h2 class="recipecard-title">{recipes.title}</h2>
              <div class="recipecard-creator-wrapper">
                {/* If there is no onClick prop, don't show creator */}
                {onClick && (
                  <>
                    <p>By:</p>
                    <h3
                      className="recipecard-creator"
                      onClick={(event) => onClick(recipes.creator._id, event)}
                    >
                      {recipes.creator.username}
                    </h3>
                  </>
                )}
              </div>
              <p class="recipecard-description">
                {recipes.description
                  ? recipes.description
                  : descriptionPlaceholder}
              </p>
              <div className="recipecard-ratings-wrapper">
                <StarIcon
                  solidClassName={"recipe-solid-star"}
                  regularClassName={"recipe-regular-star"}
                  icon={faStar}
                  ratings={recipes.ratings}
                />
                <p className="recipecard-ratings">{`${recipes.ratings.length}`}</p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default RecipeCard;
