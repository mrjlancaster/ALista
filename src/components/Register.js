import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Register.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = ({ registrationEmail }) => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState(registrationEmail);
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	let history = useHistory();

	const [errorMessage, setErrorMessage] = useState({
		nameError: "",
		emailError: "",
		passwordError: "",
		passwordTwoError: "",
	});

	// Form validation
	// const validateForm = () => {
	// 	let nameError = "";
	// 	let emailError = "";
	// 	let passwordError = "";
	// 	let passwordTwoError = "";

	// 	if (!firstName || firstName.length < 5) {
	// 		nameError = "Please enter your name";
	// 	}

	// 	if (!registration.email && !registration.email.includes("@")) {
	// 		emailError = "Please enter valid email";
	// 	}

	// 	if (!registration.password || registration.password.length < 6) {
	// 		passwordError = "Password must be minimum of 6 characters";
	// 	}

	// 	if (registration.confirmPassword !== registration.password) {
	// 		passwordTwoError = "Password does not match";
	// 	}

	// 	if (nameError || emailError || passwordError || passwordTwoError) {
	// 		setErrorMessage({
	// 			nameError,
	// 			emailError,
	// 			passwordError,
	// 			passwordTwoError,
	// 		});
	// 		return false;
	// 	}
	// 	return true;
	// };

	const handleSubmit = async (e) => {
		e.preventDefault();

		const data = {
			firstName,
			lastName,
			email,
			password,
			confirmPassword,
		};

		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		try {
			const response = await axios.post("/api/register", data, config);
			const isAuthenticated = await response.data.success;
			const token = await response.data.token;

			if (isAuthenticated && token) {
				localStorage.setItem("Token", token);
				history.push("/dashboard");
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="register_container">
			<div className="register_back-btn">
				<Link to="/">
					<i className="fas fa-long-arrow-alt-left"></i> back
				</Link>
			</div>
			<div className="register_sidebar">
				<h1>A-Lista</h1>
				<div className="newUserRegistration">
					<h3>
						New Member <br />
						Registration
					</h3>
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

			<div className="register_form-container">
				<form onSubmit={handleSubmit} className="register_form">
					<h1>Register</h1>
					<div className="register_inputs-container">
						<input
							className={
								errorMessage ? "register_name-input" : "notValid"
							}
							// className="register_name-input"
							type="text"
							placeholder="Full name*"
							name="full_name"
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
							// required
						/>
						<div className="errorMessage">{errorMessage.nameError}</div>

						<input
							className={
								errorMessage ? "register_name-input" : "notValid"
							}
							// className="register_name-input"
							type="text"
							placeholder="Last name*"
							name="last_name"
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
							// required
						/>
						<div className="errorMessage">{errorMessage.nameError}</div>

						<input
							className="register_email-input"
							type="email"
							placeholder="Email*"
							name="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							// required
						/>
						<div className="errorMessage">{errorMessage.emailError}</div>

						<input
							className="register_password-input"
							type="password"
							placeholder="Password*"
							name="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							// required
						/>
						<div className="errorMessage">
							{errorMessage.passwordError}
						</div>

						<input
							className="register_passwordTwo-input"
							type="password"
							placeholder="Confirm password*"
							name="password_confirmation"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							// required
						/>
						<div className="errorMessage">
							{errorMessage.passwordTwoError}
						</div>
					</div>

					<div className="register_button-container">
						<button type="submit">Create account</button>
						<p>
							Already have an account?
							<Link to="/login"> Login</Link>
						</p>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Register;
