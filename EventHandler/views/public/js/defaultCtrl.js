angular.module('syookApp')
.controller('dataViewController', function($scope)
{
	var count = 0;
	$scope.items = []
	$scope.success_pkts = 0
	$scope.failure_pkts = 0
	
	
	//Needs the connection to the correct domain. Don't forget to replace it.
	var socket = io.connect('http://192.168.99.100:3000');
	//var socket = io.connect('http://localhost:3000');
	socket.on('connect', function()
	{
		$scope.items = []
		
	})
	//$scope.items = [{'a': 1}, {'b': 2}, {'c': 3}]
	socket.on('good old data', function(data)
	{
		data = data['data']
		if (data == false || data == undefined)
		{
			$scope.$applyAsync(() => $scope.failure_pkts += 1)
			return
		}
		console.log("Data has been deciphered", data)
		$scope.$applyAsync(() => 
		{
			
			$scope.items.push(data)
			$scope.success_pkts += 1 
		})
	})
	socket.on('bad data', function(err)
	{
		console.log("Error : ", err['message'])
		$scope.$applyAsync(() => $scope.failure_pkts += 1)
	})
	
})
