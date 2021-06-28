// server.js
// where your node app starts


// init project
require('dotenv').config();
var express = require('express');
var app = express();

let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


//Request Header Parser Microservice Project
app.get("/api/whoami", (req, res) => {
  //get ip from ipify cause I don't know how to
  //install XMLHttpRequest and require it
  let ipRequest = new XMLHttpRequest();
  ipRequest.open("GET", 'https://api.ipify.org?format=json', true);
  ipRequest.send();
  ipRequest.onload = () => {
    let ip = JSON.parse(ipRequest.responseText).ip;
    let userAgent = req.header("User-Agent");
    let language = req.header("Accept-Language");
    res.json({
      "ipaddress": ip,
      "language": language,
      "software": userAgent
    })
  }
})


// listen for requests :)
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + 3000);
});
