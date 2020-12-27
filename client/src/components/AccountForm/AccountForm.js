import React, { useState } from "react";
import AccountFormHeader from "../AccountFormHeader/AccountFormHeader";
import { useHistory } from "react-router-dom";
import "../../sass/main.scss";
import { useDispatch, useSelector } from "react-redux";
import { authenticateUser } from "../../redux/slices/user/authenticateUser";

const AccountForm = ({ page }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const { loading, hasErrors, user } = useSelector(
    (state) => state.authenticateUser
  );
  const dispatch = useDispatch();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    dispatch(authenticateUser({ email: email, password: password }));
  };

  const handleRegister = () => {
    dispatch(
      authenticateUser({ email: email, password: password, username: username })
    );
  };

  const handleClick = (event) => {
    event.preventDefault();
    page === "register" ? handleRegister() : handleLogin();
  };

  return (
    <div className="accountform-container">
      {localStorage.getItem("auth-token") && history.push("/")}
      <div className="accountform-left-block"></div>
      <div className="accountform-form-container">
        <AccountFormHeader page={page} />
        <form className="accountform-form">
          <>
            <label className="accountform-label">Email:</label>
            <input
              type="text"
              name="email"
              className="email-input"
              onChange={handleEmailChange}
              value={email}
              placeholder="Email"
            />
          </>
          {page === "register" && (
            <>
              <label className="accountform-label">Username:</label>
              <input
                type="text"
                name="name"
                className="username-input"
                onChange={handleUsernameChange}
                value={username}
                placeholder="Username"
              />
            </>
          )}
          <>
            <label className="accountform-label">Password:</label>
            <input
              type="password"
              name="name"
              className="password-input"
              onChange={handlePasswordChange}
              value={password}
              placeholder="Password"
            />
          </>
        </form>
        <button onClick={(event) => handleClick(event)}>
          {page === "register" ? "Register" : "Login"}
        </button>
      </div>
    </div>
  );
};

export default AccountForm;
