/* This is the emitter
*/


var express = require('express')
var app = express()
var server = require('http').Server(app);
var io = require('socket.io-client')('http://localhost:3000')

var dataSource = require('./functions/dataSource.js')

io.on('connect', function()
{
	console.log("Connected to handler")
})

io.on('begin connect', function(data)
{
	console.log(data)
	
	
	io.emit('encrypted data', {my: 'data'}) 
	

})
 

server.listen(5000, (req,res) =>
{
	console.log("5k hearing")
});