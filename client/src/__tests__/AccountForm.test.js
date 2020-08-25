import React from "react";
import { shallow } from "enzyme";
import AccountForm from "../components/AccountForm/AccountForm";

let AccountFormWrapper;
beforeAll(() => {
  AccountFormWrapper = shallow(<AccountForm />);
});

describe("<AccountForm /> component", () => {
  it("renders", () => {
    shallow(<AccountForm />);
  });

  it("should render name input", () => {
    expect(AccountFormWrapper.find(".email")).toHaveLength(1);
  });

  it("should render password input", () => {
    expect(AccountFormWrapper.find(".password")).toHaveLength(1);
  });
});
