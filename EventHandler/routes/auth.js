var router = require('express').Router()
var crypto = require('crypto')

var userModel = require('../models/userData.js')

router.use(function(req,res,next)
{
/*
	Authentication is done here.
	Very basic.
	Whenever a user logs in , his client will store some information. In this case it is simply the username and password.
	For every authenticated route, He needs to send the above information which is checked in the db.
	Ideally, Authetication is nowhere like the above
	*/
	
	var userName = req.body.userName || req.header['userName']
	var password = req.body.password || req.header['password']
	
	if (!(userName && password))
	{
		res.status(403).send("Unauthorzied to access. Illegal input")
		return
	}
	password = crypto.createHash(process.env.HASH_METHOD).update(password).digest('hex')
	
	userModel.findOne({'user': userName, 'password': password}, function(err,found)
	{
		if (err)
		{
			console.error('Error finding')
			res.status(500).send("Server error")
		}
		else
		{
			if (found)
			{
				next()
			}
			else
			{
				res.status(401).send("Unauthorized")
			}
		}
	})
})

module.exports = router;