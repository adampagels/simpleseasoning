import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import RecipeForm from "../../domain/Recipe/RecipeForm";
import { fetchRecentJobs } from "../../api/GET/fetchRecentJobs";

const Home = () => {
  const [recentRecipes, setRecentRecipes] = useState(null);

  const accessToken = localStorage.getItem("auth-token");

  useEffect(() => {
    fetchRecentJobs(accessToken).then(
      (response) => {
        console.log(response);
        setRecentRecipes(response);
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
      <RecipeCard recentRecipes={recentRecipes} />
    </>
  );
};

export default Home;
