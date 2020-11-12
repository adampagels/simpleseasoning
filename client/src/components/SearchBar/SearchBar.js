import React from "react";

const SearchBar = () => {
  return (
    <>
      <input
        type="text"
        placeholder="Find recipes"
        class="searchbar-input"
      ></input>
      <button type="submit" class="searchbar-button">
        Search
      </button>
    </>
  );
};

export default SearchBar;
