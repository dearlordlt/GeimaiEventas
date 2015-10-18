var express = require('express');
var app = express();

var fs = require("fs");

function dataToUsers(data) {
    var obj = [];
    var users = data.toString().split(';');
    for (var i = 0; i < users.length - 1; i++) {
        var user = users[i].split('|');
        obj.push({
            name: user[0],
            points: user[1],
            money: user[2]
        });
    }
    return obj;
}

function dataToWords(data) {
    return data.toString().split(';');
}

app.get('/users/', function (req, res) {
    fs.readFile('DB/zaidejai.txt', function (err, data) {
        if (err) throw err;
        res.charset = 'UTF-8';
        res.set('Content-Type', 'text/plain');
        res.send(dataToUsers(data));
    });
});

app.get('/words/', function (req, res) {
    fs.readFile('DB/zodziai.txt', function (err, data) {
        if (err) throw err;
        res.charset = 'UTF-8';
        res.set('Content-Type', 'application/json');
        res.send(dataToWords(data));
    });
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});