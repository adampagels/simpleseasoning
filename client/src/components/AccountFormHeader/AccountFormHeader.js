import React from "react";
import { Link } from "react-router-dom";

const AccountFormHeader = ({ page }) => {
  return (
    <>
      <h1 className="accountformheader-h1">
        {page === "register" ? "Sign up" : "Sign in"}
      </h1>
      <p className="accountformheader-sub-header">
        or{" "}
        {page === "register" ? (
          <Link to="/login">sign into your account</Link>
        ) : (
          <Link to="/register">create an account</Link>
        )}
      </p>
    </>
  );
};

export default AccountFormHeader;
