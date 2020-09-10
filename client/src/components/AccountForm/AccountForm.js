import React, { useState } from "react";
import axios from "axios";
import "../../sass/main.scss";

const AccountForm = (props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    axios
      .post("http://localhost:5000/users/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        const data = response.data;
        localStorage.setItem("auth-token", data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const handleRegister = () => {
    axios
      .post("http://localhost:5000/users/register", {
        username: username,
        password: password,
        email: email,
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const handleClick = (event) => {
    event.preventDefault();
    props.page === "register" ? handleRegister() : handleLogin();
  };

  return (
    <div class="accountform-container">
      <div class="accountform-left-block"></div>
      <div class="accountform-form-container">
        <form class="accountform-form">
          <>
            <label>Email:</label>
            <input
              type="text"
              name="email"
              className="email-input"
              onChange={handleEmailChange}
              value={email}
              placeholder="Email"
            />
          </>
          {props.page === "register" && (
            <>
              <label>Username:</label>
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
            <label>Password:</label>
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
          {props.page === "register" ? "Register" : "Login"}
        </button>
      </div>
    </div>
  );
};

export default AccountForm;
