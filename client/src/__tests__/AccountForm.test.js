import React from "react";
import { shallow } from "enzyme";
import AccountForm from "../components/AccountForm/AccountForm";

let AccountFormWrapper;
beforeAll(() => {
  AccountFormWrapper = shallow(<AccountForm />);
});

it("renders", () => {
    shallow(<AccountForm />);
  });
