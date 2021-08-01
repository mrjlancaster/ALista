const { Pool } = require("pg");

const pool = new Pool({
	host: "localhost",
	port: 5432,
	user: "postgres",
	password: process.env.DB_SECRET,
	database: "a_lista",
});

module.exports = pool;
