'use strict';

angular.module('geimas').directive('newsString', function () {
    return {
        templateUrl: 'components/common/news/news-string.html',
        controller: function ($scope, $http, $interval) {

            $scope.players = [];
            $scope.news = [];

            $scope.conf = {
                news_length: false,
                news_pos: 0, // the starting position from the right in the news container
                news_margin: 50,
                news_move_flag: true
            };

            $scope.getUsers = function () {
                $http({
                    method: 'GET',
                    url: 'http://localhost:3000/users/?news-' + Math.random(),
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
                $http.get('http://localhost:3000/news/', null).success(function (data) {
                    if (data && data.length > 0) {
                        $scope.news = $scope.populate(data);
                        $interval($scope.news_move, 50);
                    }
                });
            };

            $scope.populate = function (data) {
                var arr = [];
                angular.forEach(data, function (item) {
                    var str = item.title.split('%randomPlayer%').join($scope.players[Math.floor(Math.random() * $scope.users.length)]);
                    arr.push({title: str.toUpperCase()});
                });
                return arr;
            }

            $scope.get_news_right = function (idx) {
                var $right = $scope.conf.news_pos;
                for (var ri = 0; ri < idx; ri++) {
                    if (document.getElementById('news_' + ri)) {
                        $right += $scope.conf.news_margin + angular.element(document.getElementById('news_' + ri))[0].offsetWidth;
                    }
                }
                return $right + 'px';
            };

            $scope.news_move = function () {
                if ($scope.conf.news_move_flag) {
                    $scope.conf.news_pos -= 1;
                    if (angular.element(document.getElementById('news_0'))[0].offsetLeft > angular.element(document.getElementById('news_strip'))[0].offsetWidth + $scope.conf.news_margin) {
                        var first_new = $scope.news[0];
                        $scope.news.push(first_new);
                        $scope.news.shift();
                        $scope.conf.news_pos += angular.element(document.getElementById('news_0'))[0].offsetWidth + $scope.conf.news_margin;
                    }
                }
            };

            $scope.getUsers();
        }
    };
});
