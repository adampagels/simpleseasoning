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
          photos: values.image,
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
    <form>
      <label>
        Title:
        <input
          type="text"
          name="title"
          className="title-input"
          onChange={handleInputChange}
          value={values.title}
        />
      </label>
      <label>
        Image Upload:
        <input
          type="file"
          name="image-upload"
          className="image-input"
          accept="image/png, image/jpeg"
          onChange={(e) => {
            handleImageUpload(e.target.files[0]);
          }}
        />
      </label>
      <label>
        Description:
        <input
          type="text"
          name="description"
          className="description-input"
          onChange={handleInputChange}
          value={values.description}
        />
      </label>
      <label>
        Ingredients:
        <input
          type="text"
          name="ingredients"
          className="ingredients-input"
          onChange={handleInputChange}
          value={values.ingredients}
        />
      </label>
      <label>
        Instructions:
        <input
          type="text"
          name="instructions"
          className="instructions-input"
          onChange={handleInputChange}
          value={values.instructions}
        />
      </label>
      <label>
        Cook-Time:
        <input
          type="text"
          name="cookTime"
          className="cook-time-input"
          onChange={handleInputChange}
          value={values.cookTime}
        />
      </label>
      <label>
        Prep-Time:
        <input
          type="text"
          name="prepTime"
          className="prep-time-input"
          onChange={handleInputChange}
          value={values.prepTime}
        />
      </label>
      <label>
        Diet:
        <input
          type="text"
          name="diet"
          className="diet-input"
          onChange={handleInputChange}
          value={values.diet}
        />
      </label>
      <button onClick={(event) => handleRecipeSubmit(event)}>Submit</button>
    </form>
  );
};

export default RecipeForm;
