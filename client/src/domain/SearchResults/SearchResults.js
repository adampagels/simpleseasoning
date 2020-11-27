import React from "react";
import RecipeCard from "../../components/RecipeCard/RecipeCard";

const SearchResults = ({ location }) => {
  return (
    <>
      <RecipeCard recipes={location.state.searchResults} />
    </>
  );
};

export default SearchResults;
