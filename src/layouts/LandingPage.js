import React, { useState } from 'react';
import './LandingPage.css';
// import axios from 'axios';

const LandingPage = () => {
	const [ msg, setMsg ] = useState('Coming soon')
	const [ email, setEmail ] = useState({
		email: ''
	});

	const handleSubmit = (e) => {
		e.preventDefault();

		if (email.email === '') {
			return false;
		}

		const option = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(email)
		}

		fetch('/api/notify', option)
			.then(response => response.json())
			.catch(error => error)


		// axios({
		// 	url: '/api/notify-me',
		// 	method: 'post',
		// 	data: email
		// })
		// .then(res => console.log(res))
		// .catch(err => console.log(err));

		// clear input field
		setEmail({email: ''});
		setMsg('Thank you!')
	}

	return (
		<div className="landing__page">
			<div className="landing__page--content">
				<h2 className="coming__soon--title">A-LISTA</h2>
				{/* <p className="hashtag">#Underconstruction</p> */}
				<div className="coming__soon">
					<p className="coming__soon--text">{msg}</p>
				</div>

				<form onSubmit={handleSubmit} className="notify__me--wrapper">
					<input 
						type="text" 
						name="email" 
						className="notify__me--input" 
						placeholder="youremail@example.com" 
						value={email.email} 
						onChange={(e) => setEmail({email: e.target.value})} 
						required
					/>
					<button type="submit" className="get__notified--btn">
						Get Notified <i className="fas fa-long-arrow-alt-right"></i>
					</button>
				</form>
			</div>
			<p className="copyrights">Copyright &copy; 2020 All Rights Reserved</p>
		</div>
	)
}

export default LandingPage;
