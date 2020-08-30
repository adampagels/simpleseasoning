import React, { useState } from "react";

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
        <input type="file" name="image-upload" className="image-input" />
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
      <button>Submit</button>
    </form>
  );
};

export default RecipeForm;
