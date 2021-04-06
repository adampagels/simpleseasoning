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
import axios from "axios";
import { updateUser } from "../../redux/slices/user/authenticateUser";
import RatingModal from "../../components/RatingModal/RatingModal";
import HeaderBackground from "../../components/HeaderBackground/HeaderBackground";
import { motion } from "framer-motion";

const Recipe = ({ location, history }) => {
  const [loadingFavoriteRecipe, setLoadingFavoriteRecipe] = useState(false);
  const [checkmark, setCheckmark] = useState([]);
  const [isFavorite, setFavorite] = useState(false);
  const [isRated, setIsRated] = useState(false);
  const { loading, hasErrors, recipe } = useSelector(
    (state) => state.fetchSingleRecipe
  );
  const [modalIsOpen, setIsOpen] = useState(false);
  const imagePlaceholder = process.env.PUBLIC_URL + "/imagePlaceholder.jpg";

  const { user: currentUser } = useSelector((state) => state.authenticateUser);
  const dispatch = useDispatch();
  const filteredUserRating =
    recipe && recipe.ratings.filter((x) => x.user === currentUser._id);

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

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleUserClick = (value) => {
    history.push({
      pathname: `/user/${value}`,
      state: {
        user: `${value}`,
      },
    });
  };

  const addFavoriteRecipe = async () => {
    setLoadingFavoriteRecipe(true);
    const accessToken = localStorage.getItem("auth-token");
    try {
      const response = await axios.post(
        `http://localhost:5000/users/${currentUser.username}/favorite-recipes/${location.state.recipe}`,
        {
          username: `${currentUser.username}`,
        },
        {
          headers: {
            "auth-token": accessToken,
            "Content-type": "application/json",
          },
        }
      );
      dispatch(updateUser(response.data));
      setFavorite(true);
      setLoadingFavoriteRecipe(false);
    } catch (error) {
      setLoadingFavoriteRecipe(false);
      console.log(error);
    }
  };

  const removeFavoriteRecipe = async () => {
    setLoadingFavoriteRecipe(true);
    const accessToken = localStorage.getItem("auth-token");
    try {
      const response = await axios.delete(
        `http://localhost:5000/users/${currentUser.username}/favorite-recipes/${location.state.recipe}`,
        {
          headers: {
            "auth-token": accessToken,
            "Content-type": "application/json",
          },
        }
      );
      dispatch(updateUser(response.data));
      setFavorite(false);
      setLoadingFavoriteRecipe(false);
    } catch (error) {
      setLoadingFavoriteRecipe(false);
      console.log(error);
    }
  };

  const recipeID = location.state
    ? location.state.recipe
    : window.location.pathname.slice(8);

  const checkIfFavorite = () => {
    currentUser.favoriteRecipes.map(
      (recipe) => recipe._id.includes(recipeID) && setFavorite(true)
    );
  };

  const checkIfRated = () => {
    console.log(filteredUserRating);
    filteredUserRating && filteredUserRating.length !== 0 && setIsRated(true);
  };

  useEffect(() => {
    checkIfFavorite();
    dispatch(fetchSingleRecipe(recipeID));
    return () => {
      dispatch(resetRecipeState());
    };
  }, []);

  useEffect(() => {
    checkIfRated();
  }, [recipe]);

  const pageVariants = {
    initial: {
      opacity: 0,
      scale: 0.8,
    },
    in: {
      opacity: 1,
      scale: 1,
    },
    out: {
      opacity: 0,
      scale: 1.2,
    },
  };

  const headerVariants = {
    initiall: {
      height: 150,
    },
    inn: {
      height: 360,
    },
    outt: {
      height: 150,
    },
  };

  const pageTransition = {
    type: "spring",
    bounce: 0.25,
    ease: "anticipate",
    duration: 0.5,
  };

  return (
    <>
      <motion.div
        initial="initiall"
        animate="inn"
        exit="outt"
        variants={headerVariants}
        transition={pageTransition}
        style={{
          height: 150,
          backgroundColor: "#249288",
          position: "absolute",
          width: "100%",
          top: 0,
        }}
      >
        <HeaderBackground page={"recipe"} />
      </motion.div>
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        style={{
          position: "relative",

          zIndex: 5,
        }}
      >
        {recipe && !loading && recipe.length !== 0 && (
          <div className="recipe-container">
            <div className="recipe-left-div">
              <div className="recipe-basic-info">
                <h1 className="recipe-title">{recipe.title}</h1>
                <p
                  className="recipe-creator"
                  onClick={() => handleUserClick(recipe.creator._id)}
                >
                  By: {recipe.creator.username}
                </p>
                <div className="recipe-timing-rating-wrapper">
                  <div className="recipe-preptime-wrapper">
                    <p className="recipe-preptime-header">Prep Time (Mins):</p>
                    <p className="recipe-preptime">{recipe.prepTime}</p>
                  </div>
                  <div className="recipe-cooktime-wrapper">
                    <p className="recipe-cooktime-header">Cook Time (Mins):</p>
                    <p className="recipe-cooktime">{recipe.cookTime}</p>
                  </div>
                  <div className="recipe-totaltime-wrapper">
                    <p className="recipe-totaltime-header">
                      Total Time (Mins):
                    </p>
                    <p className="recipe-totaltime">
                      {Number(recipe.prepTime) + Number(recipe.cookTime)}
                    </p>
                  </div>
                  <div
                    className="recipe-ratings-wrapper"
                    onClick={() => !isRated && openModal()}
                  >
                    <p className="recipe-ratings-header">
                      {recipe.ratings.length}{" "}
                      {recipe.ratings.length > 1 || recipe.ratings.length === 0
                        ? "ratings"
                        : "rating"}
                    </p>
                    <StarIcon
                      solidClassName={"recipe-solid-star"}
                      regularClassName={"recipe-regular-star"}
                      icon={faStar}
                      ratings={recipe.ratings}
                    />
                    {!isRated ? (
                      <p className="recipe-rating-message">
                        Click here to rate this recipe!
                      </p>
                    ) : (
                      <p className="recipe-rating-message">
                        You rated this recipe{" "}
                        {filteredUserRating && filteredUserRating[0].stars}{" "}
                        stars
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <p className="recipe-description">
                {recipe.description
                  ? recipe.description
                  : "No description has been added for this recipe."}
              </p>
              <ul className="recipe-diet-wrapper">
                {recipe.diet.map((diet, index) => (
                  <li className="recipe-diet" key={index}>
                    {diet}
                  </li>
                ))}
              </ul>
            </div>
            <div className="recipe-right-div">
              <div className="recipe-image-wrapper-big">
                <div className="heart-icon-wrapper">
                  <HeartIcon
                    className={
                      isFavorite
                        ? "recipe-heart-favorited"
                        : "recipe-heart-unfavorited"
                    }
                    regularIcon={faHeart}
                    onClick={() =>
                      !loadingFavoriteRecipe && !isFavorite
                        ? addFavoriteRecipe()
                        : removeFavoriteRecipe()
                    }
                  />
                </div>
                <img
                  className="recipe-image"
                  alt={recipe.title}
                  src={recipe.photo ? recipe.photo : imagePlaceholder}
                />
              </div>
              <div className="recipe-ingredients-wrapper-big">
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
            <div className="recipe-instructions-wrapper">
              <h2 className="recipe-instructions-header">Instructions: </h2>
              {recipe.instructions.map((instruction, index) => (
                <p className="recipe-instructions" key={index}>
                  {"Step" + " " + (index + 1) + " " + instruction}
                </p>
              ))}
            </div>
            <RatingModal
              recipeID={recipe._id}
              modalIsOpen={modalIsOpen}
              closeModal={() => closeModal()}
              recipeTitle={recipe.title}
            />
          </div>
        )}
      </motion.div>
    </>
  );
};

export default withRouter(Recipe);
