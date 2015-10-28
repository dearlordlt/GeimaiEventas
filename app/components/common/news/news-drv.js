'use strict';

angular.module('geimas').directive('newsString', function () {
    return {
        templateUrl: 'components/common/news/news-string.html',
        controller: function ($scope, $http, $interval, $timeout) {

            $scope.players = [];
            $scope.news = [];

            $scope.newslineStart = function () {
                $("#marquee").marquee();
            };

            $timeout(function() {
                $scope.newslineStart();
            }, 1000);

            /*$scope.conf = {
             news_length: false,
             news_pos: 0, // the starting position from the right in the news container
             news_margin: 50,
             news_move_flag: true
             };*/

            $scope.getUsers = function () {
                $http({
                    method: 'GET',
                    url: 'http://192.168.43.85:3000/users/?news-' + Math.random(),
                    headers: {'Content-Type': 'application/json'}
                }).then(function successCallback(response) {
                    var users = response.data;
                    angular.forEach(users, function (user) {
                        $scope.players.push(user.name);
                    });
                    $scope.init(); //entry point
                }, function errorCallback(response) {
                    $scope.error = response.data;
                });
            };

            $scope.init = function () {
                $http.get('http://192.168.43.85:3000/news/', null).success(function (data) {
                    if (data && data.length > 0) {
                        $scope.news = $scope.populate(data);
                        $interval($scope.news_move, 50);
                    }
                });
            };

            $scope.populate = function (data) {
                var arr = [];
                angular.forEach(data, function (item) {
                    var str = item.title.split('%randomPlayer%').join($scope.players[Math.floor(Math.random() * $scope.players.length)]);
                    arr.push({title: str.toUpperCase()});
                });
                return arr;
            };

            $scope.getUsers();
        }
    };
});
