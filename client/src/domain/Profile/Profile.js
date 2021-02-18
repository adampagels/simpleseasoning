import React, { useState, useEffect } from "react";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserById,
  resetUserState,
} from "../../redux/slices/user/fetchUserById";
import Header from "../../components/Header/Header";

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

  return (
    <>
      {user && !loading && (
        <>
          <Header headerText={`Chef ${user.username}`} />
          <div className="profile-recipes-favorites-toggle-wrapper">
            <button
              className="profile-recipes"
              onClick={() => !toggleStatus && setToggleStatus(!toggleStatus)}
            >
              {user && user.recipes.length + " Recipes"}
            </button>
            <button
              className="profile-favorite-recipes"
              onClick={() => toggleStatus && setToggleStatus(!toggleStatus)}
            >
              {user && user.favoriteRecipes.length + " Favorites"}
            </button>
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
        </>
      )}
    </>
  );
};

export default withRouter(Profile);
