import React from "react";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import Header from "../../components/Header/Header";
import { motion } from "framer-motion";
import HeaderBackground from "../../components/HeaderBackground/HeaderBackground";

const SearchResults = ({ location, history }) => {
  const handleImageClick = (value) => {
    history.push({
      pathname: `/recipe/${value}`,
      state: {
        recipe: `${value}`,
      },
    });
  };

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
      <HeaderBackground page={"searchresults"} />
      <Header
        headerText={`${location.state.searchResults.length} results for '${location.state.inputValue}' `}
      />
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        <RecipeCard
          handleImageClick={handleImageClick}
          recipes={location.state.searchResults}
        />
      </motion.div>
    </>
  );
};

export default SearchResults;
