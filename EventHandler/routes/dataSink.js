var crypto = require('crypto')
var CheckSum = require('./checkSum.js')


function decrypt(text) 
{
	//Split the encrypted field into : to obtain (e(iv_value, text))	
	var textParts = text.split(':')
	var iv = new Buffer(textParts.shift(), 'hex');
	if (iv.length < 1)
	{
		//Remove elements not encrypted in expected manner
		return false
	}
	var encryptedText = new Buffer(textParts.join(':'), 'hex');
	
	try
	{
		var hash = crypto.createHash(process.env.HASH_METHOD).update(process.env.CRYPTO_PASSWORD).digest('hex').slice(0,32)
		var decipher = crypto.createDecipheriv(process.env.ALGORITHM, hash, iv);

		var decrypted = decipher.update(encryptedText);

		decrypted = Buffer.concat([decrypted, decipher.final()]);
	}
	catch (e)
	{
		decrypted = ''
	}

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
		// Without '|' the input is incorrect. Assume we have one input which is -> An input + | +  hashed value
		if (payload.length < 2)
		{
			return false
		}
		else
		{
			payload.forEach(function(item)
			{
				if (item)
				{
					try
					{
						//console.log(item)
						var plain_text = decrypt(item)
					}
					catch (e)
					{
						console.log("An error occured during decryption\n\n")
						console.log(e)
						return false
					}
					list.push(plain_text)
				}
			})
		}
	})
	//if (typeof(list) != 'object' || typeof(list) != 'Array') return false
	return createObjectFrom(list)
}

function if_transmission_valid(transmission)
{
	
	if (transmission == undefined || transmission == false)
	{
		return false
	}
	
	
	var transmitted_object = decrypt_payload(transmission)
	
	if (transmitted_object == false)
	{
		return false
	}
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
			
module.exports = 
{
	decrypt_payload,
	decrypt,
	if_transmission_valid
}