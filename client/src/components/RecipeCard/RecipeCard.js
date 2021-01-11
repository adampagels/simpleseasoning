import React from "react";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import StarIcon from "../../components/Icon/StarIcon";

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
            <h3
              className="recipecard-creator"
              onClick={() => onClick(recipes.creator._id)}
            >
              {recipes.creator.username}
            </h3>
            <p class="recipecard-description">{recipes.description}</p>
            <div className="recipecard-ratings-wrapper">
              <StarIcon
                className={"recipe-star"}
                solidIcon={faStar}
                regularIcon={farStar}
                ratings={recipes.ratings}
              />
              <p className="recipecard-ratings">{`${recipes.ratings.length}`}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default RecipeCard;
