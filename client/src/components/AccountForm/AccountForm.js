import React, { useState } from "react";
import AccountFormHeader from "../AccountFormHeader/AccountFormHeader";
import { useHistory } from "react-router-dom";
import "../../sass/main.scss";
import { useDispatch, useSelector } from "react-redux";
import { authenticateUser } from "../../redux/slices/user/authenticateUser";
import Button from "../Button/Button";

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
      <div className="accountform-left-block">
        {page === "login" ? (
          <>
            <p className="accountform-greeting-message">Welcome back, chef!</p>
            <p className="accountform-greeting-message">
              What new recipes are up your sleeve?
            </p>
          </>
        ) : (
          <>
            <p className="accountform-greeting-message">
              Tired of ads and overly long descriptions?
            </p>
            <p className="accountform-greeting-message">Yeah, so are we.</p>
            <p className="accountform-greeting-message">Let's make recipes simple.</p>
          </>
        )}
      </div>
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
        <Button
          onClick={(event) => handleClick(event)}
          text={page === "register" ? "Register" : "Login"}
          buttonID="accountform-button"
        />
      </div>
    </div>
  );
};

export default AccountForm;
