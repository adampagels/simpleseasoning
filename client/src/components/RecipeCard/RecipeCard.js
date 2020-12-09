import React from "react";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import Icon from "../../components/Icon/Icon";

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
            <div classname="recipecard-ratings-wrapper">
              <Icon
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
