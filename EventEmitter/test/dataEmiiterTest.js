var assert = require('assert')
var Emitter = require('../functions/dataSource.js')
var Checksum = require('../functions/checkSum.js')
  


describe('EMITTER', function()
{
	describe('Emitter can get_random_values', function()
	{
		it('should return an object with 2+ parameters', function()
		{	
			assert.ok(typeof(Emitter.get_random_values()) == 'object')
		})
	})
	
	
	//Testing the below situations was very cumbersome since process.env variable was not visible to testing
	
	describe('Emitter and Checksum encrypt strings', function()
	{
		it('should return an encrypted value', function()
		{
			//A better test would be to check if encrypted value is hexadecimal
			assert.ok(typeof(Checksum("RandomBlobofString")) == 'string')
			assert.ok(typeof(Emitter.encrypt("RandomString")) == 'string')
		})
	})
	
	describe('Emitter prepares values to be transmitted', function()
	{	
		it('should be a string', function()
		{
			//Check for separation using '|'
			assert.equal(typeof(Emitter.prepareTransmission()) == 'string')
			assert.equal(typeof(Emitter.prepareTransmission(1)) == 'string')
		})
	})
			
})