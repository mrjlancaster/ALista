import React, { useState } from "react";
import "./LandingPage.css";
import axios from "axios";

const LandingPage = () => {
	const [message, setMessage] = useState("Coming soon");
	const [email, setEmail] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (email === "") return false;

		try {
			const data = { email };
			const config = { headers: { "Content-Type": "application/json" } };

			const response = await axios.post("/api/newsletter", data, config);
			console.log(response.data);
			// clear input field
			setEmail({ email: "" });
			setMessage("Thank you!");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="landing__page">
			<div className="landing__page--content">
				<h2 className="coming__soon--title">A-LISTA</h2>
				{/* <p className="hashtag">#Underconstruction</p> */}
				<div className="coming__soon">
					<p className="coming__soon--text">{message}</p>
				</div>

				<form onSubmit={handleSubmit} className="notify__me--wrapper">
					<input
						type="text"
						name="email"
						className="notify__me--input"
						placeholder="youremail@example.com"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
					<button type="submit" className="get__notified--btn">
						Get Notified <i className="fas fa-long-arrow-alt-right"></i>
					</button>
				</form>
			</div>
			<p className="copyrights">Copyright &copy; 2020 All Rights Reserved</p>
		</div>
	);
};

export default LandingPage;
