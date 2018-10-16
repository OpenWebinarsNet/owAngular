(function(angular) {
    'use strict';

    var app = angular.module('testModule', []);
    app.controller('testController', ['$scope', testController]);
    function testController($scope) {

        var keySessionStorage = 'keySessionStorage';
        var keyLocalStorage = 'keyLocalStorage';

        $scope.data = {};

        $scope.setSessionStorage = function() {
            sessionStorage.setItem(keySessionStorage, 'hola desde session storage');
        };
        $scope.setLocalStorage = function() {
            localStorage.setItem(keyLocalStorage, 'hola desde local storage');
        };

        $scope.getSessionStorage = function() {
            $scope.data.valueSessionStorage = sessionStorage.getItem(keySessionStorage);
        };
        $scope.getLocalStorage = function() {
            $scope.data.valueLocalStorage = localStorage.getItem(keyLocalStorage);
        };


    }
})(window.angular);