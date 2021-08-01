const express = require("express");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();
const cors = require("cors");
const routes = require("./routes/users");

// middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("build")); // render public folder

app.use("/api", routes);

app.listen(process.env.PORT, () => {
	console.log(`Listening on port ${process.env.PORT}`);
});
