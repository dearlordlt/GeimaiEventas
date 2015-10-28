'use strict';
angular.module('geimas.results', ['chartjs-directive']).controller('ResultsController', ['$scope', '$interval', '$timeout', '$http',
	function ($scope, $interval, $timeout, $http) {


		/*
		 * RESULTS
		 */
		$scope.turn = 0;
		$scope.users = null;
		$scope.usersArray = [];
		$scope.systems = [
			'Kepleris 17',
			'Gaybotų sistema',
			'Nanopiratų zona',
			'Startreko fanai',
			'Šmrglarl',
			'Imperija',
			'Nykštukinio papučio sistema',
			'Makrogastrofagai',
			'Šmorblakso kometa ir draugai',
			'Uberlandija'];
		$scope.pointsTotall = 0;

		$scope.getPercent = function (points) {
			console.log($scope.usersArray);
			var percent = Math.round(points / $scope.pointsTotall * 1000) / 10;
			return percent == Infinity ? 0.0 : percent;
		};

		$scope.getPercentThisTurn = function (points) {
			//console.log($scope.usersArray);
			var allPointsThisTurn = 0;
			for(var i=0; i<$scope.usersArray.length;i++) {
				allPointsThisTurn += $scope.usersArray[i].points * $scope.usersArray[i].rnd[$scope.turn];
			}
			var percent = Math.round(points / allPointsThisTurn * 1000) / 10;
			return percent == Infinity ? 0.0 : percent;
		};

		$scope.rndArr = function() {
			var arr = [0];
			for (var i = 1; i < 9; i++) {
				arr.push(Math.random());
			}
			arr.push(1);
			arr.sort();
			return arr;
		};

		$scope.getRoundedPercent = function (a,b) {
			return Math.round(a*b);
		};

		$scope.getUsersData = function () {
			$http({
				method: 'GET',
				url: 'http://192.168.43.85:3000/users/?' + Math.random(),
				headers: {'Content-Type': 'application/json'}
			}).then(function successCallback(response) {
				$scope.error = null;
				$scope.pointsTotall = 0;
				$scope.users = response.data;
				angular.forEach($scope.users, function (user) {
					if (user.role == 'k') {
						$scope.pointsTotall += parseInt(user.points);
						$scope.usersArray.push({president : user.name, points : parseInt(user.points), rnd : $scope.rndArr()});
					}
				});

			}, function errorCallback(response) {
				$scope.error = response.data;
			});
		};

		$scope.getUsersData();

		$scope.showRes = function(index) {
			//$scope.usersArray
			$scope.turn = index;
		};

		/*
		 * TWEETS
		 * */
		$scope.rndTweet = function () {
			var img = Math.floor(Math.random() * $scope.tweets) + 1;
			if (img < 10) {
				img = '00' + img;
			} else if (img > 9) {
				img = '0' + img;
			}
			return 'img/TW/' + img + '.jpg';
		};

		$scope.tweets = 15;
		$scope.tweet1 = $scope.rndTweet();
		$scope.tweet2 = $scope.rndTweet();
		$scope.tweet3 = $scope.rndTweet();

		$interval(function () {
			$scope.tweet1 = $scope.tweet2;
			$scope.tweet2 = $scope.tweet3;

			var img = Math.floor(Math.random() * $scope.tweets) + 1;
			if (img < 10) {
				img = '00' + img;
			} else if (img > 9) {
				img = '0' + img;
			}

			$scope.tweet3 = $scope.rndTweet();
		}, 30000);


	}]);
