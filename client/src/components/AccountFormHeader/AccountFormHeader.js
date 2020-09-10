import React from "react";

const AccountFormHeader = ({ page }) => {
  return (
    <>
      <h1 className="accountformheader-h1">
        {page === "register" ? "Sign up" : "Sign in"}
      </h1>
    </>
  );
};

export default AccountFormHeader;
