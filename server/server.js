const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
require("dotenv").config();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("build")); // render public folder

// route
const routes = require("./routes/authRoutes");

// set view engine
app.set("view engine", "ejs");

app.use("/api", routes);

app.listen(process.env.PORT, () => {
	console.log(`Listening on port${process.env.PORT}`);
});
