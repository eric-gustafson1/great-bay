const mysql = require('mysql');
const inquirer = require('inquirer');

// Create the connection information
const connection = mysql.createConnection({
    host: 'localhost',

    port: 3306,

    user: 'root',
    password: 'hmtdih2tym!',
    database: 'greatbay_db'
});

// Make connection to mysql db
connection.connect((err) => {
    if (err) throw err;
    start();
});

const start = () => {
    console.log('in start')
}