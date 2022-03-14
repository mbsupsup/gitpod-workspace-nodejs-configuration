const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 4000;

//serve html using express
app.use(express.static('./app/public'));

// use body-parser
app.use(bodyParser.json());

// initialize routes
app.use('/api', require('./routes/api'));

// listen for requests
app.listen(process.env.port || port, function(){
    console.log('Now listening for requests...');
});



//for serving html
// const http = require('http')
// const fs = require('fs')

// const server = http.createServer((req, res) => {
//   res.writeHead(200, { 'content-type': 'text/html' })
//   fs.createReadStream('index.html').pipe(res)
// })

// server.listen(process.env.PORT || 3000)