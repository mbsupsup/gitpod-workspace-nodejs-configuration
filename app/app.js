const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 4000;

// use body-parser
app.use(bodyParser.json());

// initialize routes
app.use('/api', require('./routes/api'));

// listen for requests
app.listen(process.env.port || port, function(){
    console.log('Now listening for requests...');
});