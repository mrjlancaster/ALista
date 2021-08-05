const express = require("express");
const site = express.Router();
const { login, register, private } = require("../controllers/auth");

site.post("/login", login);
site.post("/register", register);
site.post("/private", private);

// get a user (login)
site.get("/users", async (req, res) => {
	try {
		const allUsers = await pool.query("SELECT first_name FROM users");

		res.json(allUsers.rows);
	} catch (error) {
		console.log(error);
		res.json({ message: error.message });
	}
});

// get user by id
site.get("/users/:id", async (req, res) => {
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
site.patch("/users/:id", async (req, res) => {
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
site.delete("/users/:id", async (req, res) => {
	try {
		const { id } = req.params;
		await pool.query("DELETE FROM users WHERE user_id = $1", [id]);

		res.json("user deleted successfully");
	} catch (error) {
		res.status(500).json({ message: "Something went wrong" });
	}
});

module.exports = site;
