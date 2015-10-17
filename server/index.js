var express = require('express');
var app = express();

var fs = require("fs");

app.get('/users/', function (req, res) {
    fs.readFile('DB/zaidejai.txt', function (err, data) {
        if (err) throw err;
        res.set('Content-Type', 'text/plain');
        res.send(data);
    });
});

app.get('/words/', function (req, res) {
    fs.readFile('DB/zodziai.txt', function (err, data) {
        if (err) throw err;
        res.set('Content-Type', 'text/plain');
        res.send(data);
    });
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});