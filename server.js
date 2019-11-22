const mysql = require('mysql');
const inquirer = require('inquirer');
const chalk = require('chalk');

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
    inquirer.prompt({
        name: 'postOrBid',
        type: 'list',
        message: 'Would you like to Post and auction or Bid on an auction?',
        choices: ['POST', 'BID', 'EXIT']
    }).then((answer) => {
        if (answer.postOrBid === 'POST') {
            postAuction();
        } else if (answer.postOrBid === 'BID') {
            bidAuction()
        } else {
            connection.end();
        }
    });

}

const postAuction = () => {
    inquirer.prompt([{
        name: 'item',
        type: 'input',
        message: 'What is the item you want to post for auction?'
    },
    {
        name: 'category',
        type: 'input',
        message: 'What category would you like to put your auction in?'
    },
    {
        name: 'startingBid',
        type: 'input',
        message: 'What would you like your starting bid to be?',
        validate: function (value) {
            if (isNaN(value) === false) {
                return true;
            }
            return false;
        }
    }

    ]).then((answer) => {
        connection.query(
            "INSERT INTO auctions SET ?",
            {
                item_name: answer.item,
                category: answer.category,
                starting_bid: answer.startingBid || 0,
                highest_bid: answer.highest_bid || 0
            },
            (err) => {
                if (err) throw err;
                console.log(chalk.green('Your auction was successfully created..'));
                start();
            }
        );
    });
}

const bidAuction = () => {
    connection.query("SELECT * FROM auctions", (err, results) => {
        if (err) throw err;

        inquirer.prompt([
            {
                name: 'choice',
                type: 'rawlist',
                choices: function () {

                    let choiceArray = results.map(choice => choice.item_name)
                    return choiceArray;
                },
                message: 'What item would you like to bid on?'
            },
            {
                name: 'bid',
                type: 'input',
                message: 'How much would you like to bid?'
            }
        ]).then((answer) => {
            let chosenItem;
            for (let i = 0; i < results.length; i++) {
                if (results[i].item_name === answer.choice) {
                    chosenItem = results[i];
                }
            }

            if (chosenItem.highest_bid < parseInt(answer.bid)) {
                connection.query(
                    "UPDATE auctions SET ? WHERE ?",
                    [
                        {
                            highest_bid: answer.bid
                        },
                        {
                            id: chosenItem.id
                        }
                    ],
                    (error) => {
                        if (error) throw error;
                        console.log(chalk.green("Bid placed successfully.."));
                        start()
                    }
                );
            } else {
                console.log(chalk.yellow('Your bid was too low.  Try again..'));
                start();
            }
        })
    })
}