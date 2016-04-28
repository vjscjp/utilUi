
var express = require('express');
var serveStatic = require("serve-static");

var app = express(); 
app.use(serveStatic(__dirname + "/.")); 


app.get('/endpoints', function (req, res) {
	var eps={}
	//eps.test		= process.env.ENV_VARIABLE 
	res.json(eps);
});

//Server listening port.
app.listen(3000);
console.log('Server running on http://localhost:3000/');