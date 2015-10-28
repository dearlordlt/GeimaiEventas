'use strict';
angular.module('geimas.zodis', []).controller('ZodisController', ['$scope','$interval', '$http', function($scope, $interval, $http) {

    $scope.error = null;
    $scope.score = 0;
    $scope.zodisArray = ['stąringai','kiūti trusikai','stufįfas','kaliošas','Jonaš','bieėzabrazija'];
    $scope.zodis = '';
    $scope.gameLength = 180;
    $scope.gameTimeLeft = $scope.gameLength;
    $scope.minLeft = Math.floor($scope.gameTimeLeft/60);
    $scope.secLeft = $scope.gameTimeLeft - $scope.minLeft * 60;
    $scope.gameWordLength = 15;

    $scope.interval;

    $scope.resetGame = function() {
        $scope.gameTimeLeft = $scope.gameLength;
        if (angular.isDefined($scope.interval)) {
            $interval.cancel($scope.interval);
            $scope.interval = undefined;
        }
        $scope.zodis = '';
    };

    $scope.startGame = function () {
        $scope.score = 0;
        $scope.resetGame();
        $scope.newWord();
        $scope.interval =  $interval(function() {
            $scope.gameTimeLeft--;
            if ($scope.gameTimeLeft <= 0) {
                $scope.gameTimeLeft = 0;
                $scope.gameWordLength = 0;
                $scope.resetGame();
            };
            $scope.minLeft = Math.floor($scope.gameTimeLeft/60);
            $scope.secLeft = $scope.gameTimeLeft - $scope.minLeft * 60;
            $scope.zodisCountdown();
        },1000);
    };
    $scope.zodisCountdown = function () {
        $scope.gameWordLength--;
        if ($scope.gameWordLength < 0) $scope.newWord();

    };
    $scope.newWord = function (points) {
        if(points) $scope.score += points;
        $scope.gameWordLength = 15;
        var index = Math.floor(Math.random() * $scope.zodisArray.length);
        $scope.zodis = $scope.zodisArray[index];
    };

    $scope.getWordList = function() {
        $http({
            method: 'GET',
            url: 'http://192.168.43.85:3000/words/?' + Math.random(),
            headers: {'Content-Type': 'application/json'}
        }).then(function successCallback(response) {
            $scope.error = null;
            $scope.zodisArray = response.data;
            $scope.zodisArray.splice($scope.zodisArray.length - 1, 1)
        }, function errorCallback(response) {
            $scope.error = response.data;
        });
    };

    $scope.addPoint = function () {
        $scope.score ++;
    };

    $scope.removePoint = function () {
        $scope.score --;
    };

    $scope.getWordList();

}]);
