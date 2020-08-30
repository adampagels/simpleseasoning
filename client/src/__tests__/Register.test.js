import React from "react";
import { shallow } from "enzyme";
import Register from "../domain/Register/Register";
import AccountForm from "../components/AccountForm/AccountForm";

let RegisterWrapper;
beforeAll(() => {
  RegisterWrapper = shallow(<Register />);
});

describe("<Register /> component", () => {
  it("renders", () => {
    shallow(<Register />);
  });

  it("should render AccountForm", () => {
    expect(RegisterWrapper.find(AccountForm)).toHaveLength(1);
  });
});
