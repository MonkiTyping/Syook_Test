var socket = io.connect('http://localhost:3000');
//socket.emit('my other event', {data: "LameAF"})
socket.on('good old data', function(data)
{
	console.log("Data has been deciphered", data)
	//On getting data, read the data and write it to HTML document
	return data;
})
socket.on('bad data', function(err)
{
	console.log("Error : ", err['message'])
})

