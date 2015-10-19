'use strict';

angular.module('geimas').directive('animateOnChange', function($timeout) {
    return function(scope, element, attr) {
        scope.$watch(attr.animateOnChange, function(nv,ov) {
            if (!angular.equals(nv, ov)) {
                element.addClass('changed');
                $timeout(function() {
                    element.removeClass('changed');
                }, 1000); // Could be enhanced to take duration as a parameter
            }
        });
    };
});