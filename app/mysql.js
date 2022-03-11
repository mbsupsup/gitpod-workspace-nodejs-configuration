const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'gitpod_db'
});

//connection.connect();

connection.connect(function(err) {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }

    console.log('Connected as ID ' + connection.threadId);
});

connection.query('SELECT * FROM Contact', function (error, results, fields) {
    console.log(results);
});

connection.end();