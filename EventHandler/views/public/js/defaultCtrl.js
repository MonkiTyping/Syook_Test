angular.module('syookApp')
	.controller('dataViewController', function($scope)
	{
		var count = 0;
		$scope.message = 'Go fuck yourself'
		$scope.items = []
		
		var socket = io.connect('http://localhost:3000');
		socket.on('connect', function()
		{
			$scope.items = []
		})
		//$scope.items = [{'a': 1}, {'b': 2}, {'c': 3}]
		socket.on('good old data', function(data)
		{
			data = data['data']
			if (count > 5)
			{
			}
			console.log("Data has been deciphered", data)
			$scope.$apply(() => $scope.items.push(data))
			//use $applyAsync()	
		})
		socket.on('bad data', function(err)
		{
			console.log("Error : ", err['message'])
		})
		
	})
