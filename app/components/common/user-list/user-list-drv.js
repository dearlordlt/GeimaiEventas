angular.module('geimas').directive('userList', function ($rootScope) {
    return {
        templateUrl: 'components/common/user-list/user-list.html',
        controller: ['$scope', '$http', '$timeout', function ($scope, $http, $interval, $route) {
            $scope.users = null;
            $scope.error = null;

            $scope.getUsersData = function () {
                $http({
                    method: 'GET',
                    url: 'http://localhost:3000/users/?' + Math.random(),
                    headers: {'Content-Type': 'application/json'}
                }).then(function successCallback(response) {
                    $scope.error = null;
                    angular.forEach($scope.users, function (value, key) {
                        if ($scope.users[key].name != response.data[key].name ||
                            $scope.users[key].points != response.data[key].points ||
                            $scope.users[key].money != response.data[key].money
                        ) {
                            response.data[key]['changed'] = true;
                            console.log(["Data has changed for user: " + $scope.users[key].name, response.data]);
                        }
                    });
                    $scope.users = response.data;
                }, function errorCallback(response) {
                    $scope.error = response.data;
                });
            };

            //Initial get data
            $scope.getUsersData();

            var intervalPromise = $interval(function () {
                $scope.getUsersData();
            }, 2000);

            /* TODO: works randomly .. :(
            $rootScope.$on("$locationChangeStart", function (event, next, current) {
                if (next != current) $interval.cancel(intervalPromise);
                var intervalPromise = $interval(function () {
                    $scope.getUsersData();
                }, 2000);
            });*/
        }]
    };
});
