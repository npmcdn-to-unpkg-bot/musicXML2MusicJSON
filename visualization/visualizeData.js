var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var path = require('path')
var config = require('./config')



app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', "*");
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers','content-type',  "X-Requested-With");
 
	next();
});

app.use(morgan('dev'));
app.use(express.static(__dirname + '/visualization'));
app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname + '/visualization/index.html'));
});


app.listen(config.port);


console.log('Server started on port ' + config.port);