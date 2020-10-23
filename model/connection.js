const mysql = require("mysql");
const {db_user, db_password, db_name} = require("../config/secrets.json");

const connection = mysql.createConnection({
    host: 'localhost',
    user: db_user,
    password: db_password,
    database: db_name
})

connection.connect();

console.log("Database Connected");


module.exports = connection;
