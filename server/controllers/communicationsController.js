const pool = require("../db");

const notify = async (req, res) => {
	const { email } = req.body;

	try {
		// Validate data
		if (!email || !email.includes("@"))
			throw Error("Please use a valid email");

		// Check if email is already stored
		const prospect = await pool.query(
			"SELECT * FROM newsletter WHERE email = $1",
			[email]
		);

		if (prospect.rows.length && prospect.rows[0].email === email)
			throw Error("User already exists");

		const newProspect = await pool.query(
			"INSERT INTO newsletter (email) VALUES ($1) RETURNING *",
			[email]
		);

		res.status(200).json({
			success: true,
			email: newProspect.rows[0].email,
			message: "Data received",
		});
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
};

module.exports = { notify };
