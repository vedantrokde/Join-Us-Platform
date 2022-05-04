CREATE DATABASE join_us_db;
USE join_us_db;

CREATE TABLE users {
    email VARCHAR(255) PRIMARY KEY,
    created_at TIMESTAMP DEFAULT NOW()
}

INSERT INTO usesrs (email) 
VALUES ("ram@yahoo.com"), ("ramesh@gmail.com");