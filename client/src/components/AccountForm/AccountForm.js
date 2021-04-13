import React, { useEffect, useState } from "react";
import AccountFormHeader from "../AccountFormHeader/AccountFormHeader";
import { useHistory, Redirect } from "react-router-dom";
import "../../sass/main.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  authenticateUser,
  removeErrorMessage,
} from "../../redux/slices/user/authenticateUser";
import Button from "../Button/Button";
import { motion } from "framer-motion";

const AccountForm = ({ page }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, hasErrors, user, errorMessage } = useSelector(
    (state) => state.authenticateUser
  );
  const history = useHistory();
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
    dispatch(
      authenticateUser({ page: page, email: email, password: password })
    );
    dispatch(removeErrorMessage());
  };

  const handleRegister = () => {
    dispatch(
      authenticateUser({
        page: page,
        email: email,
        password: password,
        username: username,
      })
    );
    dispatch(removeErrorMessage());
  };

  const handleClick = (event) => {
    event.preventDefault();
    page === "register" ? handleRegister() : handleLogin();
  };

  useEffect(() => {
    dispatch(removeErrorMessage());
  }, []);

  const pageVariants = {
    initial: {
      x: "100vw",
    },
    in: {
      x: "0vw",
    },
    out: {
      x: "100vw",
    },
  };

  const textVariants = {
    initial: {
      opacity: 0,
    },
    in: {
      opacity: 1,
      scale: 1,
    },
    out: {
      opacity: 0,
      scale: 1.2,
    },
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.6,
  };

  return (
    <div className="accountform-container">
      {localStorage.getItem("auth-token") && <Redirect to="/" />}
      <div className="accountform-left-block">
        <motion.div
          initial="initial"
          animate="in"
          exit="out"
          variants={textVariants}
          transition={pageTransition}
        >
          {page === "login" ? (
            <>
              <p className="accountform-greeting-message">
                Welcome back, Chef!
              </p>
              <p className="accountform-greeting-message">
                What have you been cooking?
              </p>
            </>
          ) : (
            <>
              <p className="accountform-greeting-message">
                Tired of ads and lengthy descriptions?
              </p>
              <p className="accountform-greeting-message">Yeah, so are we.</p>
              <p className="accountform-greeting-message">
                Let's make recipes simple.
              </p>
            </>
          )}
        </motion.div>
      </div>
      <div className="accountform-form-container">
        <motion.div
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
        >
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
            {errorMessage.length > 0 &&
              errorMessage
                .filter((x) => x.toLowerCase().includes("email"))
                .map((x) => <p className="accountform-error-message"> {x} </p>)}

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
                {errorMessage.length > 0 && (
                  <p className="accountform-error-message">
                    {errorMessage.filter((x) =>
                      x.toLowerCase().includes("username")
                    )}
                  </p>
                )}
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
            <p className="accountform-error-message">
              {errorMessage.length > 0 &&
                errorMessage.filter((x) =>
                  x.toLowerCase().includes("password")
                )}
            </p>
          </form>
        </motion.div>
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
