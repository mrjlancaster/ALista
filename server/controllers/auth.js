const register = async (req, res, next) => {
	try {
		const { firstName, lastName, email, password, confirmPassword } =
			req.body;
		const salt = await bcrypt.genSalt(12);
		const hashPassword = await bcrypt.hash(password, salt);

		// Client side form validation
		if (!firstName || !lastName || !email || !password)
			throw Error("Please enter all fields");

		if (password !== confirmPassword) throw Error("Password must match");

		// Check if user already exists
		const user = await pool.query(
			"SELECT email FROM users WHERE email = $1",
			[email]
		);

		if (user.rows.length && user.rows[0].email === email)
			throw Error("User already exists");

		// Create new user
		const newUser = await pool.query(
			"INSERT INTO users (first_name, last_name, email, hashedpassword) VALUES ($1, $2, $3, $4) RETURNING *",
			[firstName, lastName, email, hashPassword]
		);

		res.status(200).json({
			data: newUser.rows[0],
			message: "New user created",
		});
	} catch (error) {
		res.status(400).json({ message: error.message });
	}

	next();
};

const login = async (req, res, next) => {
	next();
};

const private = (req, res, next) => {
	next();
};

module.exports = { login, register, private };
