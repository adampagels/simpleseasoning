import React, { useState } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

const SearchBar = ({ history }) => {
  const [inputValue, setInputValue] = useState("");

  const accessToken = localStorage.getItem("auth-token");

  const handleSearch = (searchValue) => {
    return axios
      .get(
        `https://pinchofsalt-server.herokuapp.com/recipes/search/${searchValue}`,
        {
          headers: {
            "auth-token": `${accessToken}`,
          },
        }
      )
      .then((response) => {
        history.push({
          pathname: `/search/${searchValue}`,
          state: {
            searchResults: response.data,
            inputValue: inputValue,
          },
        });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  return (
    <div className="searchbar-container">
      <input
        type="text"
        placeholder="Find recipes"
        className="searchbar-input"
        value={inputValue}
        id="searchbar-input"
        onChange={(event) => setInputValue(event.target.value)}
      ></input>
      <button
        type="submit"
        className="searchbar-button"
        onClick={() => handleSearch(inputValue)}
      >
        Search
      </button>
    </div>
  );
};

export default withRouter(SearchBar);
