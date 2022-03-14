const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    multipleStatements: true
});

var sqlCommand = `
    CREATE DATABASE gitpod_db;

    USE gitpod_db;

    CREATE TABLE Contact (
        contactId INT AUTO_INCREMENT PRIMARY KEY,
        firstName VARCHAR(255) NOT NULL,
        lastName VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        age INT(3) NOT NULL,
        salary INT NOT NULL,
        address VARCHAR(255) NOT NULL
    );
    `

connection.connect(function(err) {
    if (err) throw err;
    console.log('Connected as ID ' + connection.threadId);
});

connection.query(sqlCommand, function (err, result) {
    if (err) throw err;
    console.log("Database created");
});

connection.end();
