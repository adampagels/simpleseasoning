import React from "react";

const RecipeForm = () => {
  return (
    <form>
      <label>
        Title:
        <input type="text" name="title" className="title-input" />
      </label>
      <label>
        Image Upload:
        <input type="file" name="image-upload" className="image-input" />
      </label>
      <label>
        Description:
        <input type="text" name="description" className="description-input" />
      </label>
      <label>
        Ingredients:
        <input type="text" name="ingredients" className="ingredients-input" />
      </label>
      <label>
        Instructions:
        <input type="text" name="instructions" className="instructions-input" />
      </label>
      <label>
        Cook-Time:
        <input type="text" name="cook-time" className="cook-time-input" />
      </label>
      <label>
        Prep-Time:
        <input type="text" name="prep-time" className="prep-time-input" />
      </label>
      <label>
        Diet:
        <input type="text" name="diet" className="diet-input" />
      </label>
      <button>Submit</button>
    </form>
  );
};

export default RecipeForm;
