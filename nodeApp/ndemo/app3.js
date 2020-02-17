var express = require("express");

var https = require("https");

var fs = require("fs");

var app = express();

app.get("/", function(req, res){

res.send("<h1>hello<h2>");

});

var options = {

key: fs.readFileSync("mockserver.key"),

cert: fs.readFileSync("mockserver.crt")

}

var server = https.createServer(options, app);

console.log("Listen to 3443");

server.listen(3443);