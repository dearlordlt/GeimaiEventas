'use strict';

var geimas = angular.module('geimas', ['ngRoute', 'ngAnimate', 'geimas.home', 'geimas.zodis']);

geimas.config(['$routeProvider', '$locationProvider', '$httpProvider',
    function ($routeProvider, $locationProvider, $httpProvider) {

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

        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];

    }]).run(['$route', angular.noop]);