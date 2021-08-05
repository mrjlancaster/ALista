CREATE DATABASE a_lista;

CREATE TABLE users(
	user_id SERIAL PRIMARY KEY,
	first_name VARCHAR(45),
	last_name VARCHAR(45),
	email VARCHAR(100) UNIQUE,
	hashedpassword VARCHAR(60)
);

CREATE TABLE newsletter(
	id SERIAL PRIMARY KEY,
	email VARCHAR(45)
);
