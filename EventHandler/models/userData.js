var mongoose = require('mongoose')

var userData = new mongoose.Schema(
{
	'user': { type: String, required: true, unique: false},
	'password': {type: String, required: true}
})

var users = mongoose.model('users', userData)

module.exports = users;