var express = require('express');
var app = express();

var fs = require("fs");

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    next();
});

function dataToUsers(data) {
    var obj = [];
    var users = data.toString().split(';');
    for (var i = 0; i < users.length - 1; i++) {
        var user = users[i].split('|');
        obj.push({
            name: (user[0]).toString().replace(/(\r\n|\n|\r)/gm,""),
            points: user[1].toString().replace(/(\r\n|\n|\r)/gm,""),
            money: user[2].toString().replace(/(\r\n|\n|\r)/gm,"")
        });
    }
    return obj;
}

function dataToWords(data) {
    return data.toString().split(';');
}

function dataToNews(data) {
    //title
    var arr = data.toString().replace(/(\r\n|\n|\r)/gm,"").split(';');
    var arrNews = [];

    for(var i = 0; i < arr.length-1; i++) {
        arrNews.push({'title' : arr[i]});
    }

    return arrNews;
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

app.get('/news/', function (req, res) {
    fs.readFile('DB/eilute.txt', function (err, data) {
        if (err) throw err;
        res.charset = 'UTF-8';
        res.set('Content-Type', 'application/json');
        res.send(dataToNews(data));
    });
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});