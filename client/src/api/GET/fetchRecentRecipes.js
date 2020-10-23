import axios from "axios";

export const fetchRecentRecipes = (accessToken) => {
  return axios
    .get("http://localhost:5000/recipes/most-recent", {
      headers: {
        "auth-token": `${accessToken}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.log(error.response);
    });
};
