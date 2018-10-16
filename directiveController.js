(function(angular) {
    'use strict';

    var app = angular.module('testModule', []);
    app.controller('testController', ['$scope', testController]);
    function testController($scope) {
        $scope.data = {};
        $scope.data.testText = 'test';
    }

    /* Pueden estar definidas dentro y fuera del controlador, no importa.
    Se cargan en tiempo de compilacion */

    // Template-expanding directive
    app.directive('myDirectiveWithText', function() {
        return {
            template: 'Path: {{data.testText}}'
        };
    });

    // Template-expanding directive templateUrl
    app.directive('myDirectiveWithTemplateUrl', function() {
        return {
            templateUrl: 'myDirectiveTemplate.html'
        };
    });

    // Template-expanding directive templateUrl with attributes
    app.directive('myDirectiveWithAttributes', function() {
        return {
            templateUrl: function(element, attr) {
                return 'myDirective'+attr['prueba']+'.html'
            }
        };
    });

    // Note: When you create a directive, it is restricted to attribute and elements only by default.
    // In order to create directives that are triggered by class name, you need to use the restrict option.

    /*
    *
    * The restrict option is typically set to:

     'A' - only matches attribute name
     'E' - only matches element name
     'C' - only matches class name
     'M' - only matches comment
     These restrictions can all be combined as needed:

     'AEC' - matches either attribute or element or class name
    *
    * */

    // Template-expanding directive templateUrl from class name only
    app.directive('myDirectiveWithClassName', function() {
        return {
            restrict: 'C',
            templateUrl: function(element, attr) {
                return 'myDirectiveTemplate.html'
            }
        };
    });
})(window.angular);