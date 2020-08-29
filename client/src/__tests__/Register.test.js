import React from "react";
import { shallow } from "enzyme";
import Register from "../domain/Register/Register";

let RegisterWrapper;
beforeAll(() => {
  RegisterWrapper = shallow(<Register />);
});

describe("<Register /> component", () => {
  it("renders", () => {
    shallow(<Register />);
  });
});
