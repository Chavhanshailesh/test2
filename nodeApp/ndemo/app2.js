var express = require("express");

var https = require("https");

var app = express();

app.get("/", function(req, res){

res.send("<h1>hello<h2>");

});

var server = https.createServer(app);

console.log("Listen to 3443");

server.listen(3443);