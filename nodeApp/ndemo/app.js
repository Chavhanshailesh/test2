var express = require("express");

var http = require("http");

var app = express();

app.get("/", function(req, res){

res.send("<h1>hello<h2>");

});

var server = http.createServer(app);

console.log("Listen to 3000");

server.listen(3000);