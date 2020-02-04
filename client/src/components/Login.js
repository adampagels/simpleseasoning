import React, { useState } from "react";
import axios from "axios";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = event => {
		event.preventDefault();
		axios
			.post("http://localhost:5000/users/login", {
				email: email,
				password: password
			})
			.then(response => {
				const data = response.data;
				localStorage.setItem("auth-token", data);
			})
			.catch(error => {
				console.log(error.response);
			});
	};

	return (
		<div>
			<form>
				<label>Email:</label>
				<input
					type="email"
					value={email}
					onChange={event => setEmail(event.target.value)}
				></input>
				<label>Password:</label>
				<input
					type="password"
					value={password}
					onChange={event => setPassword(event.target.value)}
				></input>
				<button onClick={handleSubmit}>Login</button>
			</form>
		</div>
	);
}
