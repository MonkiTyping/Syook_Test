var express = require('express')
var app = express()
var crpyto = require('crypto')
var path = require('path')

var server = require('http').Server(app)
var io = require('socket.io')(server);
//var mongoose = require('mongoose')

app.use(express.static(path.join(__dirname, 'views/public/')))
var dataSink = require('./routes/dataSink.js')		


io.on('connection', function(socket)
{
	console.log("connected")
	socket.emit('begin connect')
	
	socket.on('encrypted data', function(data)
	{
		var encryptedPacket = data['info']
		if (encryptedPacket == undefined)
		{
			io.emit('bad data', {data: "Packet lost during transmission"})
		}
		else
		{
			var plain_text = dataSink(encryptedPacket)
			if (plain_text != {})
			{
				console.log("Success")
				plain_text['time_accessed'] = Date.now()
				delete plain_text['secret_key']
				//I'm scared of using the below. I will explain later
				io.emit('good old data', {data: plain_text})
			}
			else
			{
				io.emit('bad data', {message: "Transmitted data is corrupted"})
			}
		}
	})		
	
})


app.get('/', function(req,res)
{
	res.sendfile('./views/public/html/index.html')
})
 


server.listen(3000, function(req,res)
{
	console.log("Heard")
});
