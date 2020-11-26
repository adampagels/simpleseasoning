import React, { useState } from "react";

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="searchbar-container">
      <input
        type="text"
        placeholder="Find recipes"
        class="searchbar-input"
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
      ></input>
      <button type="submit" class="searchbar-button">
        Search
      </button>
    </div>
  );
};

export default SearchBar;
