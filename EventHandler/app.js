var express = require('express')
var app = express()
var crypto = require('crypto')
var path = require('path')
var bodyParser = require('body-parser')
var server = require('http').Server(app)
var io = require('socket.io')(server);
var mongoose = require('mongoose')
var dotenv = require('dotenv').load();
var port = process.env.PORT || 3000;
//var favicon = require('servce-favicon')

//Am not checking for process.env.NODE_ENV is production or development

//docker has an issue with connecting to mongodb instance in windows
//replace the domain name with localhost for development

mongoose.connect('mongodb://mongoDB/syook', function(err,connected)
//mongoose.connect('mongodb://localhost/syook', function(err,connected)
{
	if (err) console.log("DB CONNECTION PROBLEM")
})


//app.use('/', express.static(__dirname, 'views/public/'))
app.use(express.static('views/public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var userModel = require('./models/userData.js')
var users = require('./routes/users.js')
var auth = require('./routes/auth.js')
var dataSink = require('./routes/dataSink.js').if_transmission_valid	


app.get('/', (req,res) =>
{
	res.status(200).send("No content here. Please try logging in by going to /login")
})

app.use('/', users)	
app.use('/stream',auth)
//Authentication required
app.post('/stream', function(req,res)
{
	res.sendFile(path.join(__dirname, './views/public/html', 'index.html'))
})


io.on('connection', function(socket)
{
	console.log("connected")
	socket.emit('begin connect')
	
	socket.on('encrypted data', function(data)
	{
		var encryptedPacket = data['info']
		if (encryptedPacket == undefined || encryptedPacket.length <= 1)
		{
			io.emit('bad data', {message: "Packet corrupted during transmission"})
		}
		else
		{
			
			var plain_text = dataSink(encryptedPacket)
			if (plain_text == false)
			{
				io.emit('bad data', {message: "Transmitted data is corrupted"})
			}
			else (plain_text != {})
			{
				plain_text['time_accessed'] = Date.now()
				delete plain_text['secret_key']
				/*
				I'm scared of using the below. The below event emits and if the server.js is listening in (client is also listening)
				it can read these events. Might be because on localhost the socket connected to app.js and server.js are the same,
				But I don't know for sure. 
				*/
				io.emit('good old data', {data: plain_text})
			}	
		}
	})		
	
})


server.listen(port, function(req,res)
{
	console.log("Listening at ", port)
});

/*
No tests are done for server code *.js like app or  server, app.route . Those tests already exist on github
Tests are done only for the user written functions
*/
