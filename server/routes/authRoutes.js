const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Notify = require('../models/Notify');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// handle errors function
const handleErrors = (err) => {
	console.log(err.message);
}

// Create token
const createToken = (id) => {
	return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 3600 })
}

// LANDING PAGE NOTIFICATION EMAIL HANDLER
router.post('/notify', (req, res) => {
	const { email } = req.body;
	const currentDate = new Date();

	const notifyUser = new Notify ({
		email: email,
		date_created: currentDate
	})
	
	notifyUser.save()
		.then(email => {
			res.status(201).json({ email: email._id });
		})
		.catch(error => handleErrors(error))
})


// REGISTER USER
router.post('/newUser', (req, res) => {
	const { name, email, password } = req.body;
	const hashedPassword = bcrypt.hashSync(password, 10);

	// Check if user already exists in db
	User.findOne({ email })
		.then(user => {
			// if user already exists, throw error
			if (user) console.log('user already exists');

			// if user doesn't exist, create new user
			const newUser = new User({
				name: name,
				email: email,
				password: hashedPassword,
				date_created: Date.now()
			});
		
			// insert new user to db
			newUser.save()
			.then(user => {
				const token = createToken(user._id);
				res.cookie('jwt', token, { httpOnly: true, expiresIn: 3600 });
				res.status(201).json({ user: user._id });
			})
			.catch(error => handleErrors(error))
		})
});

router.get('/register', () => { // REGISTER GET REQUEST

});

// LOGIN USER
router.post('/login', (req, res) => {
	const { userEmail, userPassword } = req.body;
	const hashUserPassword = bcrypt.hashSync(userPassword, 10);

	User.findOne({ email: userEmail })
		.then(user => {
			if (user) {
				// validate password
				bcrypt.compare(userPassword, user.password)
				.then(isMatch => {
					if (isMatch) {
						return res.status(200).json({ msg: 'login complete!' });
					} else {
						return res.status(400).json({ msg: 'invalid password' })
					}
				})		
			} else {
				res.status(400).json({ msg: 'user does not exist' });
			}
		})
		.catch(error => error)
});





router.get('/login', () => {});

// Logout user

module.exports = router;
