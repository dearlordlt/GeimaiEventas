'use strict';
angular.module('geimas.home', []).controller('HomeController', ['$scope', '$interval', function($scope, $interval) {
    $scope.rndTweet = function() {
        var img = Math.floor(Math.random() * $scope.tweets) + 1;
        if(img < 10) {
            img = '00' + img;
        } else if(img > 9) {
            img = '0' + img;
        }
        return 'img/TW/'+img+'.jpg';
    };

    $scope.tweets = 15;
    $scope.tweet1 = $scope.rndTweet();
    $scope.tweet2 = $scope.rndTweet();
    $scope.tweet3 = $scope.rndTweet();

    $interval(function() {
        $scope.tweet1 = $scope.tweet2;
        $scope.tweet2 = $scope.tweet3;

        var img = Math.floor(Math.random() * $scope.tweets) + 1;
        if(img < 10) {
            img = '00' + img;
        } else if(img > 9) {
            img = '0' + img;
        }

        $scope.tweet3 = $scope.rndTweet();
    }, 30000);
}]);
