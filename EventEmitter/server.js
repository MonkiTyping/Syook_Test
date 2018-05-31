/* This is the emitter
*/
var dotenv = require('dotenv').load()
var express = require('express')
var app = express()
var server = require('http').Server(app);
var io = require('socket.io-client')('http://localhost:3000') 
//Update localhost:port to the domain where your site is hosted
var port = process.env.PORT || 5000;
//Am not checking for process.env.NODE_ENV is production or development


var dataSource = require('./functions/dataSource.js').prepareTransmission

io.on('connect', function()
{//
})

io.on('begin connect', function(data)
{	
	var wrong_data = 0
	setInterval(function()
	{
		if (wrong_data > 9)
		{
			wrong_data = 0	
			var payload = dataSource(1)
			
		}
		else
		{
			wrong_data += 1
			var payload = dataSource()
		}
		io.emit('encrypted data', {info: payload}) 
	},5000)
})

app.all('/', function(req,res)
{
	res.status(200).send("This server only simulates the sending of data")
})

server.listen(port, (req,res) =>
{
	console.log("Emitting from " ,port)
});

/*
No tests are done for server code *.js like app or  server, app.route . Those tests already exist on github
Tests are done only for the user written functions
*/
