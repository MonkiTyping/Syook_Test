var crypto = require('crypto')
var CheckSum = require('./checkSum.js')


function decrypt(text) 
{
	var textParts = text.split(':')
	var iv = new Buffer(textParts.shift(), 'hex');
	if (iv.length < 1)
	{
		return false
	}
	var encryptedText = new Buffer(textParts.join(':'), 'hex');
	
	//process.env
	//var hash = crypto.createHash('sha256').update('sY0o0kPasSw0rd4T3st').digest('hex').slice(0,32)
	var hash = crypto.createHash(process.env.HASH_METHOD).update(process.env.CRYPTO_PASSWORD).digest('hex').slice(0,32)
	var decipher = crypto.createDecipheriv(process.env.ALGORITHM, hash, iv);

	var decrypted = decipher.update(encryptedText);

	decrypted = Buffer.concat([decrypted, decipher.final()]);

	return decrypted.toString();
}

function createObjectFrom(items)
{
	var object = {}
	items.forEach(function(item)
	{
		var temp = item.split('=')
		var key = temp.shift()
		var item = temp.shift()
		//Add key to object if key and value are present.
		if (key && item)
		{
			object[key] = item
		}
	})
	return object
}
	

function decrypt_payload(transmission)
{
	var list = []
	transmission = transmission.split(';;')
	transmission.forEach(function(payload)
	{
		payload = payload.split('|')
		// Without '|' the input is incorrect. Assume we have one input which is still an input and a hashed value
		if (payload.length > 2)
		{
			payload.forEach(function(item)
			{
				//if (item && item.length > 5) Why item.length > 5 ?
				if (item)
				{
					var plain_text = decrypt(item)
					list.push(plain_text)
				}
			})
		}
		else if (payload.length < 2)
		{
			console.log("Illegal input", payload)
			return false
		}
	})
	return createObjectFrom(list)
}

function if_transmission_valid(transmission)
{
	var transmitted_object = decrypt_payload(transmission)
	var transmitted_checksum = CheckSum(transmitted_object)
	if (transmitted_checksum && (transmitted_checksum == transmitted_object['secret_key']))
	{
		return transmitted_object
	}
	else
	{
		return false
	}
	
}
			
module.exports = if_transmission_valid