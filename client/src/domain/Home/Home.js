import React, { useEffect } from "react";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRecipeList,
  resetRecipeListState,
} from "../../redux/slices/recipe/fetchRecipeList";
import Header from "../../components/Header/Header";
import { motion } from "framer-motion";
import HeaderBackground from "../../components/HeaderBackground/HeaderBackground";

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
      <HeaderBackground page={"home"} />
      <Header headerText={"New Recipes"} ID={"page-header"} />
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        {!loading && (
          <RecipeCard
            recipes={recipes}
            onClick={handleUserClick}
            handleImageClick={handleImageClick}
          />
        )}
      </motion.div>
    </>
  );
};

export default Home;
