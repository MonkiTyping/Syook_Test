var crypto = require('crypto')
var CheckSum = require('./checkSum.js')


/*
Generate the data of as {name: '*', origin: '*', destination: '*'}
Hash the data ie Checksum and append to the above object
Encrypt the payload using algorithm
*/


function get_random_values()
{
	//Bunch of values to be randomly generated
	var first_names = ['Jack', 'Michael','Mike','Lucas', 'Liam', 'Noah', 'Ethan', 'Dead','Carrie','Sophie','Jackie','Elizabeth']
	var last_names = ['Jackson', 'Aiden', 'Pool', 'The Third', 'Cohen', 'Stephens', 'Christ', 'Black', 'Asphalt', 'Peterson', 'Daniels', 'King']
	var places = ['Bangalore', 'Chennai', 'Mumbai', 'Pune', 'Hyderabad', 'Mangalore', 'Mysore', 'Ooty', 'Shimla', 'Delhi', 'Gokarna', 'Goa']
	
	//2 random numbers for first and last name corresponding to an element in their array. Same numbers for origin and destination.
	//All arrays have same length
	var random_first = Math.floor((Math.random() * 10 )% first_names.length)
	var random_last = Math.floor((Math.random() * 10 ) % last_names.length)
	random_first == random_last ? random_first =  (random_first + 1) % first_names.length : console.log('')
	var random_data = 
	{
		name: first_names[random_first] + ' ' + last_names[random_last],
		origin: places[random_first],
		destination: places[random_last]
	}
	return random_data
}

function encrypt(text) 
{	
	/*
	Create a random initialization vector (iv)
	Use the secret password for encryption where secret password = hash(secret password)
	This is because aes-256-ctr uses Cipheriv which requires a 32bit key (=hash(password)) and a 16 bit iv.
	The encrypted data is written as encrypted(iv: text) because you need the encrypted iv to decrypt the data.
	*/
	
	var iv = crypto.randomBytes(16);
	var hash = crypto.createHash(process.env.HASH_METHOD).update(process.env.CRYPTO_PASSWORD).digest('hex').slice(0,32)

	
	var cipher = crypto.createCipheriv(process.env.ALGORITHM, hash, iv);
	var encrypted = cipher.update(text);
	encrypted = Buffer.concat([encrypted, cipher.final()]);

	var payload = iv.toString('hex') + ':' + encrypted.toString('hex');
	
	return 
}

function prepareTransmission(valid = 0)
{
	var object = get_random_values()
	var checksum = CheckSum(object)
	object['secret_key'] = checksum
	
	var transmission = ''
	for( item in object)
	{
		//encrypt is (key=value)
		var text = item + '=' + object[item];
		try
		{
			if (valid == 0)
			{
				var encrypted_text = encrypt(text) + '|'
			}
			else
			{
				//Generate faulty values every x seconds
				var encrypted_text = encrypt(encrypt(text)) + "|"
			}
				
		}
		catch(e)
		{
			console.log("An error occured during encryption\n\n")
			console.log(e)
		}
		transmission += encrypted_text
	}
	transmission += ';;'
	
	//If length of transmission is legal, send it. Otherwise send a random string
	if ((transmission.length > 49) && (transmission.length < 500))
	{
		return transmission
	}
	else
	{
		//If length is invalid generate random incorrect string
		transmission =  crypto.randomBytes(100).toString('hex') + '|' + crypto.randomBytes(150).toString('hex') + '|;;'
		return transmission
	}
}
		

module.exports =
{
	get_random_values,
	encrypt,
	prepareTransmission
}