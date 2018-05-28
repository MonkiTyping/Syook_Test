var crypto = require('crypto')
var CheckSum = require('./checkSum.js')

/*
Get the data of some form
Hash the data ie Checksum
Encrypt the payload
*/

function get_random_values()
{
	var first_names = ['Jack', 'Michael','Mike','Lucas', 'Liam', 'Noah', 'Ethan', 'Dead','Carrie','Sophie','Jackie','Elizabeth']
	var last_names = ['Jackson', 'Aiden', 'Pool', 'The Third', 'Cohen', 'Stephens', 'Christ', 'Black', 'Asphalt', 'Peterson', 'Daniels', 'King']
	var places = ['Bangalore', 'Chennai', 'Mumbai', 'Pune', 'Hyderabad', 'Mangalore', 'Mysore', 'Ooty', 'Shimla', 'Delhi', 'Gokarna', 'Goa']
	
	
	var random_first = Math.floor((Math.random() * 10 )% first_names.length)
	var random_last = Math.floor((Math.random() * 10 ) % last_names.length)
	random_first == random_last ? random_last =  (random_last + 1) % first_names.length : console.log('')
	var payload = 
	{
		name: first_names[random_first] + ' ' + last_names[random_last],
		origin: places[random_first],
		destination: places[random_last]
	}
	return payload
}

function encrypt(text) 
{	
	var iv = crypto.randomBytes(16);
	var hash = crypto.createHash('sha256').update('sY0o0kPasSw0rd4T3st').digest('hex').slice(0,32)
	var cipher = crypto.createCipheriv('aes-256-ctr', hash, iv);
	var encrypted = cipher.update(text);

	encrypted = Buffer.concat([encrypted, cipher.final()]);

	var final = iv.toString('hex') + ':' + encrypted.toString('hex');

	return final
}

function prepareTransmission()
{
	var object = get_random_values()
	var checksum = CheckSum(object)
	object['secret_key'] = checksum
	var transmission = ''
	for( item in object)
	{
		var text = item + '=' + object[item];
		var encrypted_text = encrypt(text) + '|'
		transmission += encrypted_text
	}
	transmission += ';;'
	
	return transmission
}
		


module.exports = prepareTransmission;
