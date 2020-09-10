import React from "react";
import { shallow } from "enzyme";
import AccountForm from "../components/AccountForm/AccountForm";
import AccountFormHeader from "../components/AccountFormHeader/AccountFormHeader";

let AccountFormWrapper;
beforeAll(() => {
  AccountFormWrapper = shallow(<AccountForm page={"register"} />);
});

describe("<AccountForm /> component", () => {
  it("renders", () => {
    shallow(<AccountForm />);
  });

  it("should render email input", () => {
    expect(AccountFormWrapper.find(".email-input")).toHaveLength(1);
  });

  it("should render password input", () => {
    expect(AccountFormWrapper.find(".password-input")).toHaveLength(1);
  });

  it("should set the email value prop", () => {
    const eventObject = { target: { value: "email@email.com" } };
    AccountFormWrapper.find(".email-input").simulate("change", eventObject);
    expect(AccountFormWrapper.find(".email-input").prop("value")).toEqual(
      "email@email.com"
    );
  });

  it("should render username input on register page", () => {
    expect(AccountFormWrapper.find(".username-input")).toHaveLength(1);
  });

  it("should set the password value prop", () => {
    const eventObject = { target: { value: "password123" } };
    AccountFormWrapper.find(".password-input").simulate("change", eventObject);
    expect(AccountFormWrapper.find(".password-input").prop("value")).toEqual(
      "password123"
    );
  });

  it("render form header", () => {
    expect(AccountFormWrapper.find(AccountFormHeader)).toHaveLength(1);
  });
});
