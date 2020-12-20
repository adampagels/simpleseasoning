import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import CategoryCardRow from "../../components/CategoryCardRow/CategoryCardRow";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes } from "../../redux/slices/recipe";

const Home = ({ history }) => {
  const { loading, hasErrors, recipes } = useSelector(
    (state) => state.fetchRecipes
  );
  const dispatch = useDispatch();

  const handleUserClick = (value) => {
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

  const accessToken = localStorage.getItem("auth-token");

  useEffect(() => {
    dispatch(fetchRecipes(accessToken));
  }, []);

  return (
    <>
      {!accessToken && <Redirect to="/login" />}
      <h1>Home</h1>
      <CategoryCardRow />
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
