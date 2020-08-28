import React from "react";
import { shallow } from "enzyme";
import Login from "../domain/Login/Login";
import AccountForm from "../components/AccountForm/AccountForm";

let LoginWrapper;
beforeAll(() => {
  LoginWrapper = shallow(<Login />);
});

describe("<Login /> component", () => {
  it("renders", () => {
    shallow(<Login />);
  });

  it("should render AccountForm", () => {
    expect(LoginWrapper.find(AccountForm)).toHaveLength(1);
  });
});
