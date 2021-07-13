import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import axios from "axios";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = async (e) => {
		e.preventDefault();

		const data = {
			email,
			password,
		};

		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		try {
			const response = await axios.post("/api/users", data, config);
			console.log(response);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="login_container">
			<div className="login_back-btn">
				<Link to="/">
					<i className="fas fa-long-arrow-alt-left"></i> back
				</Link>
			</div>

			<div className="login_sidebar">
				<h1>A-Lista</h1>
				<div className="login_sidebar-content">
					<h3>Member login</h3>
					<ul>
						<li>
							<Link to="/login">Login</Link>
						</li>
						<li>
							<Link to="/register">Register</Link>
						</li>
					</ul>
				</div>
			</div>

			<div className="login_form-container">
				<form onSubmit={handleLogin} className="login_form">
					<h1>Welcome</h1>
					<div className="login_inputs-container">
						<input
							type="email"
							placeholder="Email*"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>

						<input
							type="password"
							placeholder="Password*"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>

						<p>
							<Link to="">Forgot password?</Link>
						</p>
					</div>

					<div className="login_button-container">
						<button type="submit">Login</button>
						<p>
							Don't have an account?{" "}
							<Link to="/register"> Register here</Link>
						</p>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
