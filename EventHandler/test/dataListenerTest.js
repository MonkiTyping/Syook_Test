var assert = require('assert')
var Listener = require('../routes/dataSink.js')
var Checksum = require('../routes/checkSum.js')
 


describe('LISTENER', function()
{
	
	describe('Emitter has sent decrypted data', function()
	{
		/* it('should return an object if data is decrypted', function()
		{	
			//Need an example for decryption
			assert.ok(typeof(if_transmission_valid('encrypted_string')) == 'object')
		}) */
		it('should return false if there is an error with decryption or if computed hash is not the same as the dervived hash', function()
		{
			assert.ok(Listener.if_transmission_valid('') == false)
		})
	})
	
	
	describe('Decryption process', function()
	{
		it('decrypt fails on a  wrongly encrypted string', function()
		{
			assert.ok((Listener.decrypt("RandomBlobofString")) == false)
		})
		it('decrypt fails on an invalid input', function()
		{
			assert.ok((Listener.decrypt('xyz:abc | cde: fgh | haha: haha') == false))
		})
	})
			
})