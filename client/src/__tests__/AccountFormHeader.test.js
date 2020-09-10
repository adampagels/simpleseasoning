import React from "react";
import { shallow } from "enzyme";
import AccountFormHeader from "../components/AccountFormHeader/AccountFormHeader";

let AccountFormHeaderWrapper;
beforeAll(() => {
  AccountFormHeaderWrapper = shallow(<AccountFormHeader />);
});

describe("<AccountFormHeaderWrapper /> component", () => {
  it("renders", () => {
    shallow(<AccountFormHeader />);
  });
});
