import React, { useEffect } from "react";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRecipeList,
  resetRecipeListState,
} from "../../redux/slices/recipe/fetchRecipeList";

const Home = ({ history }) => {
  const { loading, hasErrors, recipes } = useSelector(
    (state) => state.fetchRecipeList
  );
  const dispatch = useDispatch();

  const handleUserClick = (value, event) => {
    event.stopPropagation();
    history.push({
      pathname: `/user/${value}`,
      state: {
        user: `${value}`,
      },
    });
  };

  const handleImageClick = (value) => {
    history.push({
      pathname: `/recipe/${value}`,
      state: {
        recipe: `${value}`,
      },
    });
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("auth-token");
    dispatch(fetchRecipeList(accessToken));

    return () => {
      dispatch(resetRecipeListState());
    };
  }, []);

  return (
    <>
      <h1>Home</h1>
      {!loading && (
        <RecipeCard
          recipes={recipes}
          onClick={handleUserClick}
          handleImageClick={handleImageClick}
        />
      )}
    </>
  );
};

export default Home;
