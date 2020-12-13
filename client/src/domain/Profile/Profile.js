import React, { useState, useEffect } from "react";
import axios from "axios";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import { withRouter } from "react-router-dom";

const Profile = ({ location, history, userId }) => {
  const [user, setUser] = useState("");
  const getOtherUser = () => {
    const accessToken = localStorage.getItem("auth-token");
    axios
      .get(`http://localhost:5000/users/${location.state.user}`, {
        headers: {
          "auth-token": `${accessToken}`,
        },
      })
      .then((userData) => {
        setUser(userData.data);
      });
  };

  const getCurrentUser = () => {
    const accessToken = localStorage.getItem("auth-token");
    axios
      .get(`http://localhost:5000/users/${location.userId}`, {
        headers: {
          "auth-token": `${accessToken}`,
        },
      })
      .then((userData) => {
        setUser(userData.data);
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
    location.state ? getOtherUser() : getCurrentUser();
  }, []);

  return (
    <>
      <h1 className="profile-username">{user.username}</h1>
      <RecipeCard recipes={user.recipes} handleImageClick={handleImageClick} />
    </>
  );
};

export default withRouter(Profile);
