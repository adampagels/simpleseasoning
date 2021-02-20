import React from "react";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import Header from "../../components/Header/Header";

const SearchResults = ({ location }) => {
  return (
    <>
      <Header
        headerText={`${location.state.searchResults.length} results for '${location.state.inputValue}' `}
      />
      <RecipeCard recipes={location.state.searchResults} />
    </>
  );
};

export default SearchResults;
