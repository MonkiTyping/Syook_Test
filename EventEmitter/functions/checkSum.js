var crypto = require('crypto')


function CheckSum(obj)
{
	let hash = crypto.createHash(process.env.HASH_METHOD )
	let accumulator = ''
	for (value in obj)
	{
		if (value == 'secret_key')
		{
			continue
		}
		accumulator += obj[value]
	}
	hash.update(accumulator)
	var checksum = hash.digest('hex')
	return checksum
}

module.exports = CheckSum;