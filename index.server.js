const express = require("express");
const mysql = require("mysql");
const env = require("dotenv");
const path = require("path");
const app = express();

// environment valirables or constants
env.config();

// middlewares
app.set("view engine", "ejs");
app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	})
);
app.use("/public", express.static(path.join(__dirname, "public/static")));

// connecting to database
const connection = mysql.createConnection({
	host: process.env.DB_URI,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_DATABASE,
});

// routes
app.get("/", (req, res) => {
	var query = "SELECT COUNT(*) as total FROM users;";
	connection.query(query, (err, rows, fields) => {
		if (err) throw err;
		var count = rows[0].total;
		res.render("home", { count: count });
	});
});

app.post("/register", (req, res) => {
	const user = { email: req.body.email };
	connection.query("INSERT INTO users SET ?", user, (err, rows, fields) => {
		if (err) console.log(err.sqlMessage);
	});
	res.redirect("/");
});

// running on port 3000
app.listen(process.env.PORT, () => {
	console.log(`Server is running on port ${process.env.PORT}`);
});
