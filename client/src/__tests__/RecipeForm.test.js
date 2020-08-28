import React from "react";
import { shallow } from "enzyme";
import RecipeForm from "../domain/Recipe/RecipeForm";

let RecipeFormWrapper;
beforeAll(() => {
  RecipeFormWrapper = shallow(<RecipeForm />);
});

describe("<RecipeFormWrapper /> component", () => {
  it("renders", () => {
    shallow(<RecipeForm />);
  });
});
