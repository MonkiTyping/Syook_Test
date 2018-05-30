var mongoose = require('mongoose')
var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser')
var crypto = require('crypto')

var Users = require('../models/userData.js')

router.get('/login', (req,res) =>
{
	res.sendfile('./views/public/html/login.html')
})

router.post('/signUp', (req,res) =>
{
	res.sendfile('./views/public/html/signUp.html')
})

router.post('/login', (req,res) =>
{
	var userName = req.body.userName;
	var hashed_password = crypto.createHash(process.env.HASH_METHOD).update(req.body.password).digest('hex')

	/*
	This is not standard way of checking for password but I don't want to be seeing passwords on the server
	What I do is on receiving the password, hash it and store it.
	*/
	Users.findOne({'user': userName, password: hashed_password}, function(err,found)
	{
		if (err)
		{
			//handle err
			res.status(500).send('server error')
		}
		else
		{
			if (found)
			{		
				res.status(200).send({'success': true})
			}
			else
			{
				res.status(401).send({'message': "Incorrect credentials"})
			}
		}
	})
})

router.post('/signupUser', (req,res) =>
{
	var userName = req.body.userName;
	var password = crypto.createHash(process.env.HASH_METHOD).update(req.body.password).digest('hex')
	
	//This is NOT how you do authenitcation. 
	var new_user = new Users({'user': userName, 'password': password}).save(function(err,safe) 
	{ 
		if (err)
		{
			console.error(err)
		}
		else
		{
			res.status(200).send("<div style = 'position: absolute; height: 15%; width: 50%; margin-left: 25%;><h1 style = 'margin-left: 30%;'> You are good to log in </h1></div>")
		}
	})
})

module.exports = router;