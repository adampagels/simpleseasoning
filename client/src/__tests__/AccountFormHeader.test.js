import React from "react";
import { shallow } from "enzyme";
import AccountFormHeader from "../components/AccountFormHeader/AccountFormHeader";

let AccountFormHeaderWrapper;
beforeAll(() => {
  AccountFormHeaderWrapper = shallow(<AccountFormHeader page={"register"} />);
});

describe("<AccountFormHeaderWrapper /> component", () => {
  it("renders", () => {
    shallow(<AccountFormHeader />);
  });

  it("should render accountformheader-h1", () => {
    expect(AccountFormHeaderWrapper.find(".accountformheader-h1")).toHaveLength(
      1
    );
  });
});
