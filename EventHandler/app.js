var express = require('express')
var app = express()
var crpyto = require('crypto')
var path = require('path')

var server = require('http').Server(app)
var io = require('socket.io')(server);
//var mongoose = require('mongoose')

//app.use(express.static(path.join(__dirname, 'views/public')))


var dataSink = require('./routes/dataSink.js')		

//var encryptedStuff = dataSource()
//var decryptedStuff = dataSink(encryptedStuff)




io.on('connection', function(socket)
{
	console.log("Connected with emitter")
	
	
	socket.emit('begin connect', {start: 'now'})
	socket.on('encrypted data', function(data)
	{
		console.log(data)
	})
		
})



server.listen(3000, function(req,res)
{
	console.log("Heard")
});
