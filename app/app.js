const express = require('express');

const app = express();

app.use('/api', require('./routes/api'));

app.listen(process.env.port || 4000, function(){
    console.log('now listening for requests');
});

// const mysql = require('mysql')
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'password',
//   database: 'gitpod_db'
// })

// connection.connect(function(err) {
//   if (err) {
//     console.error('error connecting: ' + err.stack);
//     return;
//   }

//   connection.query('SELECT * FROM `Contact', function (error, results, fields) {
//     console.log(results);
//   });

//   console.log('connected as id ' + connection.threadId);
//   connection.end()
// });

// ------------------------------

// connection.connect()

// connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
//   if (err) throw err

//   console.log('The solution is: ', rows[0].solution)
// })

// connection.end()