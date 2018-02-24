
// getting required modules
var express = require('express');
// var mongoose = require('mongoose');
// initialising express app
var app = express();
var http = require('http').Server(app);

app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname + '/public'));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

app.get('/',function(req,res){
    res.render('index.html')
})



http.listen(3000);