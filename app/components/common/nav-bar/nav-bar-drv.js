angular.module('geimas').directive('navBar', function() {
    return {
        templateUrl: 'components/common/nav-bar/nav-bar.html',
        controller: function($scope, $route) {
            $scope.$route = $route;
        }
    };
});
