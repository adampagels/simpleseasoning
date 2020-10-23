import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import RecipeForm from "../../domain/Recipe/RecipeForm";
import { fetchRecentRecipes } from "../../api/GET/fetchRecentRecipes";

const Home = ({ history }) => {
  const [recipes, setRecipes] = useState(null);

  const accessToken = localStorage.getItem("auth-token");

  const handleUserClick = (value) => {
    history.push({
      pathname: `/user/${value}`,
      state: {
        user: `${value}`,
      },
    });
  };

  useEffect(() => {
    fetchRecentRecipes(accessToken).then(
      (response) => {
        setRecipes(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  return (
    <>
      {!accessToken && <Redirect to="/login" />}
      <h1>Home</h1>
      <RecipeForm />
      <RecipeCard recipes={recipes} onClick={handleUserClick} />
    </>
  );
};

export default Home;
