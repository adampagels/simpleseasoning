import React, { useState, useEffect } from "react";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserById,
  resetUserState,
} from "../../redux/slices/user/fetchUserById";
import Header from "../../components/Header/Header";
import { motion } from "framer-motion";

const Profile = ({ location, history }) => {
  const [toggleStatus, setToggleStatus] = useState(true);
  const { loading, hasErrors, user: otherUser } = useSelector(
    (state) => state.fetchUserById
  );
  const { user: currentUser } = useSelector((state) => state.authenticateUser);

  const dispatch = useDispatch();

  const handleImageClick = (value) => {
    history.push({
      pathname: `/recipe/${value}`,
      state: {
        recipe: `${value}`,
      },
    });
  };

  let isIdFromNav = location.state && location.state.isIdFromNav;
  let userIdFromRecipe = location.state && location.state.user;

  const user = isIdFromNav ? currentUser : otherUser;

  const userIdfromURL =
    !isIdFromNav && !userIdFromRecipe && window.location.pathname.slice(6);

  useEffect(() => {
    !isIdFromNav &&
      userIdFromRecipe &&
      dispatch(fetchUserById(userIdFromRecipe));

    userIdfromURL && dispatch(fetchUserById(userIdfromURL));

    return () => {
      isIdFromNav = null;
      userIdFromRecipe = null;
      dispatch(resetUserState());
    };
  }, []);

  const circleSVG = (
    <svg viewBox="0 0 500 150" preserveAspectRatio="none">
      <path
        fill="none"
        d="M325,18C228.7-8.3,118.5,8.3,78,21C22.4,38.4,4.6,54.6,5.6,77.6c1.4,32.4,52.2,54,142.6,63.7 c66.2,7.1,212.2,7.5,273.5-8.3c64.4-16.6,104.3-57.6,33.8-98.2C386.7-4.9,179.4-1.4,126.3,20.7"
      />
    </svg>
  );

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

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5,
  };

  return (
    <>
      {user && !loading && (
        <>
          <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <Header headerText={`Chef ${user.username}`} />
            <div className="profile-recipes-favorites-toggle-wrapper">
              <div className="profile-button-wrapper">
                <button
                  className={
                    toggleStatus ? "profile-recipes-active" : "profile-recipes"
                  }
                  onClick={() =>
                    !toggleStatus && setToggleStatus(!toggleStatus)
                  }
                >
                  {user && user.recipes.length + " Recipes"}
                </button>
                {circleSVG}
              </div>
              <div className="profile-button-wrapper">
                <button
                  className={
                    !toggleStatus ? "profile-recipes-active" : "profile-recipes"
                  }
                  onClick={() => toggleStatus && setToggleStatus(!toggleStatus)}
                >
                  {user && user.favoriteRecipes.length + " Favorites"}
                </button>
                {circleSVG}
              </div>
            </div>
            <>
              {toggleStatus && (
                <RecipeCard
                  recipes={user.recipes}
                  handleImageClick={handleImageClick}
                />
              )}
              {!toggleStatus && (
                <RecipeCard
                  recipes={user.favoriteRecipes}
                  handleImageClick={handleImageClick}
                />
              )}
            </>
          </motion.div>
        </>
      )}
    </>
  );
};

export default withRouter(Profile);
