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

  it("should render title input", () => {
    expect(RecipeFormWrapper.find(".title-input")).toHaveLength(1);
  });

  it("should render description input", () => {
    expect(RecipeFormWrapper.find(".description-input")).toHaveLength(1);
  });

  it("should render ingredients input", () => {
    expect(RecipeFormWrapper.find(".ingredients-input")).toHaveLength(1);
  });

  it("should render instructions input", () => {
    expect(RecipeFormWrapper.find(".instructions-input")).toHaveLength(1);
  });

  it("should render cook-time input", () => {
    expect(RecipeFormWrapper.find(".cook-time-input")).toHaveLength(1);
  });

  it("should render prep-time input", () => {
    expect(RecipeFormWrapper.find(".prep-time-input")).toHaveLength(1);
  });

  it("should render diet input", () => {
    expect(RecipeFormWrapper.find(".diet-input")).toHaveLength(1);
  });
});
