import React, { useState } from "react";
import axios from "axios";

const RecipeForm = () => {
  const [values, setValues] = useState({
    title: "",
    image: "",
    description: "",
    ingredients: "",
    instructions: "",
    cookTime: "",
    prepTime: "",
    diet: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleRecipeSubmit = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("auth-token");
    axios
      .post(
        "http://localhost:5000/recipes",
        {
          title: values.title,
          photo: values.image,
          description: values.description,
          ingredients: values.ingredients,
          instructions: values.instructions,
          cookTime: values.cookTime,
          prepTime: values.prepTime,
          diet: values.diet,
        },
        {
          headers: {
            "auth-token": `${token}`,
            "Content-type": "application/json",
          },
        }
      )
      .then((response) => {
        const data = response.data;
        console.log(data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const handleImageUpload = async (file) => {
    const token = localStorage.getItem("auth-token");
    const imageData = new FormData();
    imageData.append("image", file);
    const url = "http://localhost:5000/recipes/image-upload";

    const config = {
      method: "POST",
      body: imageData,
      headers: {
        "auth-token": `${token}`,
      },
    };

    try {
      const req = await fetch(url, config);
      if (req.ok) {
        const res = await req.json();
        setValues({ ...values, image: res.imageUrl });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="recipeform-container">
      <form className="recipeform-form">
        <div className="recipeform-left-div">
          <label
            className="recipeform-image-label"
            htmlFor="recipeform-input-photo"
          >
            <img src={values.image && values.image} id="recipeform-image" />
          </label>
          <input
            id="recipeform-input-photo"
            type="file"
            name="image-upload"
            className="recipeform-input"
            accept="image/png, image/jpeg"
            onChange={(e) => {
              handleImageUpload(e.target.files[0]);
            }}
          />
          <label>Prep-Time:</label>
          <input
            type="text"
            name="prepTime"
            className="recipeform-input"
            onChange={handleInputChange}
            value={values.prepTime}
          />
          <label>Cook-Time:</label>
          <input
            type="text"
            name="cookTime"
            className="recipeform-input"
            onChange={handleInputChange}
            value={values.cookTime}
          />
        </div>
        <div className="recipeform-right-div">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            className="recipeform-input"
            onChange={handleInputChange}
            value={values.title}
          />
          <label>Description:</label>
          <input
            type="text"
            name="description"
            className="recipeform-input"
            onChange={handleInputChange}
            value={values.description}
          />
          <label>Ingredients:</label>
          <textarea
            name="ingredients"
            className="recipeform-textarea"
            onChange={handleInputChange}
            value={values.ingredients}
          />
          <label>Instructions:</label>
          <textarea
            name="instructions"
            className="recipeform-textarea"
            onChange={handleInputChange}
            value={values.instructions}
          />
          <label>Diet:</label>
          <input
            type="text"
            name="diet"
            className="recipeform-input"
            onChange={handleInputChange}
            value={values.diet}
          />
          <button onClick={(event) => handleRecipeSubmit(event)}>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default RecipeForm;
