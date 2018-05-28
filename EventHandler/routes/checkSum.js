var crypto = require('crypto')

function CheckSum(obj)
{
	let hash = crypto.createHash('sha256')
	let accumulator = ''
	for (value in obj)
	{
		if (value == 'secret_key')
		{
			continue
		}
		accumulator += obj[value]
	}
	
	//hash the object using sha-256
	hash.update(accumulator)
	var checksum = hash.digest('hex')
	return checksum
}

module.exports = CheckSum;