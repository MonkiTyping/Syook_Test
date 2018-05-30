var express = require('express')
var app = express()
var crypto = require('crypto')
var path = require('path')
var bodyParser = require('body-parser')
var server = require('http').Server(app)
var io = require('socket.io')(server);
var mongoose = require('mongoose')
var dotenv = require('dotenv').load();
//Am not checking for process.env.NODE_ENV is production or development


mongoose.connect('mongodb://localhost:27017/syook', function(err,connected)
{
	if (err) console.log("Error establishing db connection", err)
})

app.use(express.static(path.join(__dirname, 'views/public/')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var userModel = require('./models/userData.js')
var users = require('./routes/users.js')
var dataSink = require('./routes/dataSink.js')	



app.use('/', users)	
app.use('/',function(req,res,next)
{
	var pass = req.body.password || req.headers['x-password'];
	var name = req.body.name || req.headers['x-name'];
	
	console.log(pass,name)
	
	if (!pass || !name)
	{
		res.status(401).send({'error': "No input"})
	}
	else
	{ 
		var hashed_password = crypto.createHash('sha256').update(pass).digest('hex')
		//There is no authentication going on. This is EXTREMELY INSECURE
		userModel.findOne({'user': name, 'password' : hashed_password}, function(err,found)
		{
			if (found)
			{
				console.log("Okayed")	
				next()
			}
		})
	}
})
app.post('/stream', function(req,res)
{
	res.sendfile('./views/public/html/index.html')
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
				console.log("Success")
				plain_text['time_accessed'] = Date.now()
				delete plain_text['secret_key']
				//I'm scared of using the below. I will explain later
				io.emit('good old data', {data: plain_text})
			}
			
		}
	})		
	
})


server.listen(3000, function(req,res)
{
	console.log("Heard")
});
