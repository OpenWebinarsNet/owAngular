(function(angular) {
    'use strict';

    var app = angular.module('testModule', []);
    app.controller('testController', ['$scope', testController]);
    function testController($scope) {
        var data = $scope.data = {};
        data.number = 0;
        data.dataArray = [
            {name: 'nombre', profesion: 'electricista'},
            {name: 'nombre 2', profesion: 'carpintero'}
        ];
        data.options = [
            {label: 'pedro', id: 1},
            {label: 'juan', id: 2}
        ];

        $scope.changeNgIf = function () {
            data.number = 1;
        };

        $scope.resetNumber = function() {
            data.number = 0;
        };

        data.selected = data.options[0];

        $scope.data.counter = 0;
        $scope.change = function() {
            $scope.data.counter++;
        }

        $scope.alert = function() {
            alert('hola');
        }
    }
})(window.angular);