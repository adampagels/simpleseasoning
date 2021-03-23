import React from "react";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import Header from "../../components/Header/Header";

const SearchResults = ({ location, history }) => {
  const handleImageClick = (value) => {
    history.push({
      pathname: `/recipe/${value}`,
      state: {
        recipe: `${value}`,
      },
    });
  };

  return (
    <>
      <Header
        headerText={`${location.state.searchResults.length} results for '${location.state.inputValue}' `}
      />
      <RecipeCard
        handleImageClick={handleImageClick}
        recipes={location.state.searchResults}
      />
    </>
  );
};

export default SearchResults;
