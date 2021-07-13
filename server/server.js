const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const Guest = require("./models/Guest");
const db = mongoose.connection;
require("dotenv").config();
const jwt = require("jsonwebtoken");
const cors = require("cors");
// const cookieParser = require('cookie-parser');

// route
const routes = require("./routes/authRoutes");

// middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static("build")); // render public folder
// app.use(cookieParser());

app.use(cors());
app.use("/api", routes);

// connect server and database
mongoose.connect(
	process.env.DB_CONNECTION,
	{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
	() => {
		console.log("Connected to DB successfully!");

		// run localhost
		app.listen(process.env.PORT, () => {
			console.log(`Listening on port ${process.env.PORT}`);
		});
	}
);

// Guest.find(function (err, guests) {
//     if (err) return console.error(err);
//     console.log(guests);
//   })

// Guest.insertMany([
//     {name: "Mary Jane"},
//     {name: "Mel Gibson"},
//     {name: "Jennie Morrison"}
// ])

// set view engine
app.set("view engine", "ejs");

app.use("/api", routes);

app.listen(process.env.PORT, () => {
	console.log(`Listening on port${process.env.PORT}`);
});
