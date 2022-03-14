const express = require ('express');
const router = express.Router();
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'gitpod_db'
});

connection.connect(function(err) {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }

    console.log('Connected as ID ' + connection.threadId);
});

router.get('/contact', function(req, res){
    connection.query("SELECT * FROM Contact", function(error, results, fields){
        if(error){
            res.status(500).send({error: error});
        }
        else{
            res.json(results);
        }
    });
});

router.post('/contact', function(req, res){
    if (req.body.firstName && req.body.lastName && req.body.email && req.body.age && req.body.salary && req.body.address) {
        var query = "" +
            "INSERT INTO Contact (firstName, lastName, email, age, salary, address) " +
            "VALUES ('" + req.body.firstName + "', '" + req.body.lastName + "', '" + req.body.email + "', " + req.body.age + ", " + req.body.salary + ", '" + req.body.address + "');" +
        "";
        connection.query(query, function (error, results, fields) {
            if (error) {
                res.status(500).send({error: error});
            }
            else {
                res.send({success: 'Data successfully inserted'});
            }
        });
    }
    else {
        res.status(400).send({error: 'Input error'});
    }
});

router.put('/contact/:contactId', function(req, res){
    if (req.params.contactId && req.body.firstName && req.body.lastName && req.body.email && req.body.age && req.body.salary && req.body.address) {
        var query = "" +
            "UPDATE Contact " +
            "SET " +
                "firstName ='" + req.body.firstName + "', " +
                "lastName ='" + req.body.lastName + "', " +
                "email ='" + req.body.email + "', " +
                "age =" + req.body.age + ", " +
                "salary =" + req.body.salary + ", " +
                "address ='" + req.body.address + "' " +
            "WHERE contactId =" + req.params.contactId + ";" +
        "";
        connection.query(query, function (error, results, fields) {
            if (error) {
                res.status(500).send({error: error});
            }
            else {
                if (results.affectedRows > 0) {
                    res.send({success: 'Data successfully updated'});
                }
                else {
                    res.send({warning: 'No data updated!'});
                }
                
            }
        });
    }
    else {
        res.status(400).send({error: 'Input error'});
    }
});

router.delete('/contact/:contactId', function(req, res){
    var query = "" +
        "DELETE FROM Contact " +
        "WHERE contactId =" + req.params.contactId + ";" +
    "";
    connection.query(query, function (error, results, fields) {
        if (error) {
            res.status(500).send({error: error});
        }
        else {
            if (results.affectedRows > 0) {
                res.send({success: 'Data successfully deleted'});
            }
            else {
                res.send({warning: 'No data deleted!'});
            }
        }
    });
});

module.exports = router;