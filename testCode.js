(function(angular) {
	'use strict';


	var app = angular.module('testModule', ['ui.router']);

	/** ROUTING **/
	app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

		// ---------------------------------------------------------------------


		$urlRouterProvider.otherwise('/');

		$stateProvider.state('base', {
			url: '/',
			views: {
				main: {
					templateUrl: 'testTemplateRouteHome.html',
					controller: ['$scope', testRouteController]
				}
			}
		});

		$stateProvider.state('details', {
			url: '/details',
			views: {
				main: {
					templateUrl: 'testTemplateRouteDetails.html',
					controller: ['$scope', testRouteController]
				}
			}
		});

        $stateProvider.state('rutaNueva', {
            url: '/ruta',
            views: {
                main: {
                    templateUrl: 'testTemplateRouteNueva.html',
                    controller: ['$scope', testRouteController]
                }
            }
        });
	}]);

    function testRouteController($scope) {
        $scope.messageTest = 'Mensaje de scope';
    }

	/** FILTER **/
	app.filter('reverse', function(){
		return function(input) {
			return (typeof input !== 'undefined') ? input+"---" : "";
		};
	});

	app.controller('testController', ['$scope', 'factoryName', 'serviceName', '$http', '$q', testController]);
	function testController($scope, nameFactory, nameService, $http, $q) {

        /** FACTORY **/
        $scope.testFactoryInController = function(param) {
            nameFactory(param);
        };

        /** SERVICE **/
        $scope.testServiceInController = function(param) {
            nameService.alertFunction(param);
        };

        $scope.userData = {};
        $scope.userData.path = 'texto de prueba';
		$scope.test = function() {
			$scope.userData.path = 'texto cambiado';
		}

		$scope.userData.name = 'nombre';

		/*** EXPRESSIONS ****/

		// https://docs.angularjs.org/guide/expression

		// Context:

		// JavaScript expressions are evaluated against the global window.
		// In AngularJS, expressions are evaluated against a scope object.

		// AngularJS does not use JavaScript's eval() to evaluate expressions.
		// Instead AngularJS's $parse service processes these expressions.


		$scope.clickMe = function(clickEvent) {
			console.log(clickEvent);
		};



		/** FILTERS ***/

		/* Filters format the value of an expression for display to the user.
		They can be used in view templates, controllers or services.
		AngularJS comes with a collection of built-in filters, but it is easy to define your own as well.
		 */

		/** http service **/
        var objectTest = {
            message : "No ha hecho la llamada todavia"
        };
        $scope.objectTest = objectTest;


		$scope.httpFunction = function() {

            var url = 'http://localhost/curso-symfony/curso/web/app_dev.php/cursos/course';
			var defer = $q.defer();
			var promise = defer.promise;

			$http(
				{
					method: 'POST',
					url: url,
					data: {
						name: 'nombre 1',
						description: 'descripcion'
					}
				}
			).then(
				function(response) {
					console.log('hecho!');
					defer.resolve(response);
				},
				function(response) {
					/*$scope.data = response.data || 'Request failed';
					$scope.status = response.status;*/
					console.log('Error');
					defer.reject('Error code 2');
				}
			);

			return promise;
		};

        $scope.putHttpFunction = function() {

            var url = 'http://localhost/curso-symfony/curso/web/app_dev.php/cursos/course/7';
            var defer = $q.defer();
            var promise = defer.promise;

            $http(
                {
                    method: 'PUT',
                    url: url,
                    data: {
                        name: 'nombre 1 modificado',
                        description: 'descripcion modificada'
                    }
                }
            ).then(
                function(response) {
                    console.log('hecho!');
                    defer.resolve(response);
                },
                function(response) {
                    /*$scope.data = response.data || 'Request failed';
                    $scope.status = response.status;*/
                    console.log('Error');
                    defer.reject('Error code 2');
                }
            );

            return promise;
        };

        $scope.deleteHttpFunction = function() {

            var url = 'http://localhost/curso-symfony/curso/web/app_dev.php/cursos/course/7';
            var defer = $q.defer();
            var promise = defer.promise;

            $http(
                {
                    method: 'DELETE',
                    url: url
                }
            ).then(
                function(response) {
                    console.log('hecho!');
                    defer.resolve(response);
                },
                function(response) {
                    /*$scope.data = response.data || 'Request failed';
                    $scope.status = response.status;*/
                    console.log('Error');
                    defer.reject('Error code 2');
                }
            );

            return promise;
        };

        $scope.getHttpFunction = function() {

            var url = 'http://localhost/curso-symfony/curso/web/app_dev.php/cursos/course/7';
            var defer = $q.defer();
            var promise = defer.promise;

            $http(
                {
                    method: 'GET',
                    url: url
                }
            ).then(
                function(response) {
                    console.log(response.data);
                    defer.resolve(response);
                },
                function(response) {
                    /*$scope.data = response.data || 'Request failed';
                    $scope.status = response.status;*/
                    console.log('Error');
                    defer.reject('Error code 2');
                }
            );

            return promise;
        };

		$scope.httpCall = function() {
			console.log('previous', $scope.objectTest.message);
			$scope.httpFunction().then(
				function(response) {
					// success
					$scope.objectTest.message = 'Hecho!';
					console.log(response);
				},
				function(errorResponse) {
					// reject
					$scope.objectTest.message = 'Error!';
				}
			)
		}

	};

    /*** SERVICES ***/

    app.factory('factoryName', function(){
        return function(param) {
            alert('hola, '+param);
        }
    });

    app.service('serviceName', function(){
        this.alertFunction = function(param) {
            alert(param);
        };
        this.testParam = 12;
    });

	/* Pueden estar definidas dentro y fuera del controlador, no importa. Se cargan en tiempo de compilacion */

	// Template-expanding directive
	app.directive('myDirectiveWithText', function() {
		return {
			template: 'Path: {{path}}'
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

	// Best Practice: Directives should clean up after themselves. You can use element.on('$destroy', ...)
	// or scope.$on('$destroy', ...) to run a clean-up function when the directive is removed.


    // COMPONENT
    function myComponentController() {

    }

    app.component('myComponent', {
        controller: [myComponentController],
        templateUrl: 'myComponentTemplate.html'
    });

    app.service('myServiceToComponent', function(){
        this.property = 'valueService';
    });

    // COMPONENT 2
    function myComponentController2($scope, service) {
        $scope.data = {};
        $scope.data.property = 'value';
        $scope.data.myService = service;
    }

    app.component('myComponent2', {
        controller: ['$scope','myServiceToComponent',myComponentController2],
        templateUrl: 'myComponentTemplate2.html'
    });



})(window.angular);
