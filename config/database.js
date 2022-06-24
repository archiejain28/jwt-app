var mysql = require('mysql');

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'archiejain',
    database:"jwt"
})

connection.connect((err) => {
    if(err) throw err;
})

module.exports = { connection};