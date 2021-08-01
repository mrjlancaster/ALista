const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const pool = require("../db");

// create user (register)
router.post("/register", async (req, res) => {
	const { firstName, lastName, email } = req.body;

	try {
		if (!firstName || !lastName || !email)
			throw Error("Please enter all fields");

		const newUser = await pool.query(
			"INSERT INTO users (first_name, last_name, email) VALUES ($1, $2, $3) RETURNING *",
			[firstName, lastName, email]
		);

		res.json(newUser.rows);

		// res.status(200).json({ message: "Success" });
	} catch (error) {
		console.log(error);
		res.status(400).json({ message: error.message });
	}

	// check if user already exists
	// User.findOne({ email }).then((user) => {
	// 	if (user) return res.status(400).json({ msg: "User already exists" });

	// 	const newUser = new User({
	// 		name,
	// 		email,
	// 		password,
	// 	});

	// 	bcrypt.genSalt(10, (err, salt) => {
	// 		bcrypt.hash(newUser.password, salt, (err, hash) => {
	// 			if (err) throw err;
	// 			newUser.password = hash;
	// 			newUser.save();
	// 		});
	// 	});
	// });
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

		res.json("user was successfully deleted");
	} catch (error) {
		console.log(error);
	}
});

module.exports = router;
