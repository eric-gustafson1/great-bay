CREATE DATABASE greatbay_db;

USE greatbay_db;

CREATE TABLE auctions
(
    id INT NOT NULL
    AUTO_INCREMENT PRIMARY KEY,
    item_name VARCHAR
    (100) NOT NULL,
    category VARCHAR
    (45) NOT NULL,
    starting_bid INT DEFAULT 0,
    highest_bid INT DEFAULT 0
);