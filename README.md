# great-bay
Bootcamp exercise creating an eBay like application using node.js and MySQL
+ JavaScript
+ Node.js
+ MySQL
+ Ansynchronous JavaScript
+ inquirer, mysql, chalk NPM modules


## Steps to Setup

1. Clone the repo

```bash
git clone https://github.com/eric-gustafson1/great-bay.git
```

2. Install dependencies

```bash
npm install
```
3. Create the MySQL database
```bash
CREATE DATABASE greatbay_db;

USE greatbay_db;

CREATE TABLE auctions
(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    item_name VARCHAR(100) NOT NULL,
    category VARCHAR(45) NOT NULL,
    starting_bid INT DEFAULT 0,
    highest_bid INT DEFAULT 0
);
```

4. Run Server

```bash
node server.js


# What I Learned

+ Ansynchronos JavaScript
+ Using MySQL with Node.js for CRUD operations
+ Converting ES5 into ES6 


