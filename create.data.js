const { faker } = require('@faker-js/faker');
const mysql = require("mysql");
const env = require("dotenv");

env.config()

const connection = mysql.createConnection({
	host: process.env.DB_URI,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_DATABASE,
});

const create_data = false;

if(create_data) {
    connection.connect();
    
    var users = [];
    for (i = 0; i < 500; i++) {
        users.push([faker.internet.email(), faker.date.past()]);
    }
    
    connection.query(
        "INSERT INTO users (email, created_at) VALUES ?",
        [users],
        (err, result, fields) => {
            if (err) throw err;
            console.log("Users created successfully!");
        }
    );
    
    connection.end();
}
