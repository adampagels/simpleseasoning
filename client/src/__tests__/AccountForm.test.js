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

  it("should render email input", () => {
    expect(AccountFormWrapper.find(".email")).toHaveLength(1);
  });

  it("should render password input", () => {
    expect(AccountFormWrapper.find(".password")).toHaveLength(1);
  });

  it('should set the email value prop', () => {
    const eventObject = { target: { value: 'email@email.com' }};
    AccountFormWrapper.find('.email').simulate('change', eventObject);
    expect(AccountFormWrapper.find('.email').prop('value')).toEqual('email@email.com');
  });

  it('should set the password value prop', () => {
  const eventObject = { target: { value: 'password123' }};
  AccountFormWrapper.find('.password').simulate('change', eventObject);
  expect(AccountFormWrapper.find('.password').prop('value')).toEqual('password123');
});
});
