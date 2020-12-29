import React, { useState, useEffect } from "react";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserById } from "../../redux/slices/user/fetchUserById";

const Profile = ({ location, history }) => {
  const [toggleStatus, setToggleStatus] = useState(true);
  const { loading, hasErrors, user } = useSelector(
    (state) => state.fetchUserById
  );
  const dispatch = useDispatch();

  const handleImageClick = (value) => {
    history.push({
      pathname: `/recipe/${value}`,
      state: {
        recipe: `${value}`,
      },
    });
  };

  useEffect(() => {
    let userIdFromRecipe = location.state && location.state.user;
    let isIdFromNav = location.state && location.state.isIdFromNav;
    const userIdAndIdLocation = {
      isIdFromNav: isIdFromNav,
      userIdFromRecipe: userIdFromRecipe,
    };
    dispatch(fetchUserById(userIdAndIdLocation));

    return () => {
      isIdFromNav = null;
      userIdFromRecipe = null;
    };
  }, []);

  return (
    <>
      <h1 className="profile-username">{user.username}</h1>
      <div className="profile-recipes-favorites-toggle-wrapper">
        <button
          className="profile-recipes"
          onClick={() => setToggleStatus(!toggleStatus)}
        >
          {user && user.recipes.length + " Recipes"}
        </button>
        <button
          className="profile-favorite-recipes"
          onClick={() => setToggleStatus(!toggleStatus)}
        >
          {user && user.favoriteRecipes.length + " Favorites"}
        </button>
      </div>
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
  );
};

export default withRouter(Profile);
