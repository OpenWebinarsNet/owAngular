(function(angular) {
    'use strict';

    var app = angular.module('testModule', []);
    app.controller('testController', ['$scope', testController]);
    function testController($scope) {
        $scope.userData = {};
    }
})(window.angular);