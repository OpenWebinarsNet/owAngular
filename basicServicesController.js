(function(angular) {
    'use strict';

    var app = angular.module('testModule', []);
    app.controller('testController',
        ['$scope', 'factoryName', 'serviceName', testController]);
    function testController($scope, nameFactory, service) {
        $scope.serviceFactory = nameFactory;
        $scope.service = service;
    }

    /*** SERVICES ***/

    app.factory('factoryName', function(){
        var infoToReturn = {};
        infoToReturn.alertHola = function(param) {
            alert('Soy la factoria, '+param);
        }
        return infoToReturn;
    });

    app.service('serviceName', function(){
        this.alertFunction = function(param) {
            alert('Soy el servicio ',param);
        };
        this.testParam = 12;
    });
})(window.angular);