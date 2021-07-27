import './Body.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Body = () => {
	const [ email, setEmail ] = useState('');

	
	return (
		<div className="body_container">
			<div className="body_description-wrapper">
					<h1>Your guests deserve to be reserved</h1>
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur atque aperiam suscipit incidunt rerum explicabo, maiores hic. Mollitia fuga earum corporis dolores, fugit totam dolore dicta architecto</p>
			</div>
			<div className="register_input-wrapper">
				<div>
					<input type="text" className="register_input" name="email" placeholder="emailadress@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
				</div>
				<Link to='/register' className="register_link">
					Create account <i className="fas fa-long-arrow-alt-right"></i>
				</Link>
			</div>

			<p className="copyrights">Copyright &copy; 2020 All Rights Reserved</p>
		</div>
	)
}

export default Body;
