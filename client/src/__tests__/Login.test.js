import React from "react";
import { shallow } from "enzyme";
import Login from "../domain/Login/Login";

let LoginWrapper;
beforeAll(() => {
  LoginWrapper = shallow(<Login />);
});

describe("<Login /> component", () => {
  it("renders", () => {
    shallow(<Login />);
  });
});
