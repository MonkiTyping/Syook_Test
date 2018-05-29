var express = require('express')
var app = express()
var crpyto = require('crypto')
var path = require('path')

var server = require('http').Server(app)
var io = require('socket.io')(server);
//var mongoose = require('mongoose')

//app.use(express.static(path.join(__dirname, 'views/public')))


var dataSink = require('./routes/dataSink.js')		


//var decryptedStuff = dataSink(encryptedStuff)




io.on('connection', function(socket)
{
		
	socket.emit('begin connect')
	socket.on('encrypted data', function(data)
	{
		var encryptedPacket = data['info']
		var plain_text = dataSink(encryptedPacket)
		if (plain_text != {})
		{
			console.log("Success")
			//Send plain_text to user
		}
	})
		
})



server.listen(3000, function(req,res)
{
	console.log("Heard")
});
