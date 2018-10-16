(function(angular) {
    'use strict';

    var app = angular.module('testModule', []);
    app.controller('testController', ['$scope', testController]);
    function testController($scope) {

        $scope.data = {};
        $scope.data.testModel = "valueDataTestModel";

        $scope.testModel = "valueModel";

        $scope.changeModel = function() {
            $scope.testModel = "valueModel changed";
        };
        $scope.dataChangeModel = function() {
            $scope.data.testModel = "valueDataTestModel changed";
        };

        $scope.data.number = 0;

    };

    /** FILTER **/
    app.filter('reverse', function(){
        return function(input, parameter) {
            console.log('parameter ->',parameter)
            return (typeof input !== 'undefined') ? input+"---" : "";
        };
    });


})(window.angular);
