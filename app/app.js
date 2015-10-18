'use strict';

var geimas = angular.module('geimas', ['ngRoute', 'geimas.home', 'geimas.zodis']);

geimas.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
        $routeProvider.otherwise({redirectTo: '/home'});
        $routeProvider.when('/home', {
            templateUrl: './components/home/home.html',
            controller: 'HomeController'
        });
        $routeProvider.when('/zodis', {
            templateUrl: 'components/zodis/zodis.html',
            controller: 'ZodisController'
        });
        //$locationProvider.html5Mode(false);
    }]).run(['$route', angular.noop]);