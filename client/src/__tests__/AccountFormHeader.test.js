import React from "react";
import { shallow, mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
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

  it("should set the accountformheader-h1 prop", () => {
    expect(AccountFormHeaderWrapper.find(".accountformheader-h1").text()).toBe(
      "Sign up"
    );
  });

  it("should link to login page when currently on register page", () => {
    const RouteWrapper = mount(
      <MemoryRouter>
        <AccountFormHeader page={"register"} />
      </MemoryRouter>
    );
    expect(RouteWrapper.find("Link").prop("to")).toBe("/login");
  });

  it("should link to register page when currently on login page", () => {
    const RouteWrapper = mount(
      <MemoryRouter>
        <AccountFormHeader page={"login"} />
      </MemoryRouter>
    );
    expect(RouteWrapper.find("Link").prop("to")).toBe("/register");
  });
});
