'use strict';

var app = angular.module('app', ['ui.router']);

app.config(['$httpProvider', '$stateProvider', '$urlRouterProvider', function ($httpProvider, $stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise('/home');
    //
    // Now set up the states
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'components/home/home.html',
            controller: 'HomeController'
        })
        .state('zodis', {
            url: '/zodis',
            templateUrl: 'components/zodis/zodis.html',
            controller: 'ZodisController'
        });
}]);