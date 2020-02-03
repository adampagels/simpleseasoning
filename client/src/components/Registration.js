import React, { useState } from "react";
import axios from "axios";

export default function Registration() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");

	const handleSubmit = event => {
		event.preventDefault();
		// console.log({username: username, password: password, email: email})
		axios
			.post("http://localhost:5000/users/register", {
				username: username,
				password: password,
				email: email
			})
			.then(response => {
				const data = response.data;
				console.log(data);
			})
			.catch(error => {
				console.log(error.response);
			});
	};

	return (
		<div>
			<form>
				<label>Username:</label>
				<input
					type="text"
					value={username}
					onChange={event => setUsername(event.target.value)}
				></input>
				<label>Password:</label>
				<input
					type="password"
					value={password}
					onChange={event => setPassword(event.target.value)}
				></input>
				<label>Email:</label>
				<input
					type="email"
					value={email}
					onChange={event => setEmail(event.target.value)}
				></input>
				<button onClick={handleSubmit}>Register</button>
			</form>
		</div>
	);
}
