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

  it("should render image input", () => {
    expect(RecipeFormWrapper.find(".image-input")).toHaveLength(1);
  });

  it("should set the title value prop", () => {
    const eventObject = { target: { name: "title", value: "recipe title" } };
    RecipeFormWrapper.find(".title-input").simulate("change", eventObject);
    expect(RecipeFormWrapper.find(".title-input").prop("value")).toEqual(
      "recipe title"
    );
  });

  it("should set the description value prop", () => {
    const eventObject = {
      target: { name: "description", value: "description of recipe" },
    };
    RecipeFormWrapper.find(".description-input").simulate(
      "change",
      eventObject
    );
    expect(RecipeFormWrapper.find(".description-input").prop("value")).toEqual(
      "description of recipe"
    );
  });

  it("should set the ingredients value prop", () => {
    const eventObject = {
      target: { name: "ingredients", value: "list of ingredients" },
    };
    RecipeFormWrapper.find(".ingredients-input").simulate(
      "change",
      eventObject
    );
    expect(RecipeFormWrapper.find(".ingredients-input").prop("value")).toEqual(
      "list of ingredients"
    );
  });

  it("should set the instructions value prop", () => {
    const eventObject = {
      target: { name: "instructions", value: "instructions for recipe" },
    };
    RecipeFormWrapper.find(".instructions-input").simulate(
      "change",
      eventObject
    );
    expect(RecipeFormWrapper.find(".instructions-input").prop("value")).toEqual(
      "instructions for recipe"
    );
  });

  it("should set the cook-time value prop", () => {
    const eventObject = { target: { name: "cookTime", value: "cook time" } };
    RecipeFormWrapper.find(".cook-time-input").simulate("change", eventObject);
    expect(RecipeFormWrapper.find(".cook-time-input").prop("value")).toEqual(
      "cook time"
    );
  });

  it("should set the prep-time value prop", () => {
    const eventObject = { target: { name: "prepTime", value: "prep time" } };
    RecipeFormWrapper.find(".prep-time-input").simulate("change", eventObject);
    expect(RecipeFormWrapper.find(".prep-time-input").prop("value")).toEqual(
      "prep time"
    );
  });

  it("should set the diet value prop", () => {
    const eventObject = { target: { name: "diet", value: "diet" } };
    RecipeFormWrapper.find(".diet-input").simulate("change", eventObject);
    expect(RecipeFormWrapper.find(".diet-input").prop("value")).toEqual("diet");
  });
});
