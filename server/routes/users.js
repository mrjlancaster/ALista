const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const pool = require("../db");

// create user (register)
router.post("/register", async (req, res) => {
	try {
		const { firstName, lastName, email, password } = req.body;
		const salt = await bcrypt.genSalt(12);
		const hashPassword = await bcrypt.hash(password, salt);

		// Client side form validation
		if (!firstName || !lastName || !email || !password)
			throw Error("Please enter all fields");

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
});

// get a user (login)
router.get("/users", async (req, res) => {
	try {
		const allUsers = await pool.query("SELECT first_name FROM users");

		res.json(allUsers.rows);
	} catch (error) {
		console.log(error);
		res.json({ message: error.message });
	}
});

// get user by id
router.get("/users/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [
			id,
		]);

		res.json(user.rows[0]);
	} catch (error) {
		console.log(error);
	}
});

// update user
router.patch("/users/:id", async (req, res) => {
	try {
		const { id } = req.params; // WHERE
		const { update } = req.body; // SET

		await pool.query("UPDATE users SET first_name = $1 WHERE user_id = $2", [
			update,
			id,
		]);
		res.json("User was updated");
	} catch (error) {
		console.log(error.message);
	}
});

// delete a user
router.delete("/users/:id", async (req, res) => {
	try {
		const { id } = req.params;
		await pool.query("DELETE FROM users WHERE user_id = $1", [id]);

		res.json("user deleted successfully");
	} catch (error) {
		res.status(500).json({ message: "Something went wrong" });
	}
});

module.exports = router;
