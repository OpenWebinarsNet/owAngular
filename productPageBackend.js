(function(angular) {
	'use strict';


	//var app = angular.module('testModule', ['ui.bootstrap']);
	var app = angular.module('testModule', ['ui.router']);

	/** config **/
	app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

		// ---------------------------------------------------------------------


		$urlRouterProvider.otherwise('/');

		/*$stateProvider.state('base', {
			abstract: true,
			views: {
				main: {
					templateUrl: 'testTemplateRouteFake.html',
					controller: ['$scope', testRouteController]
				}
			}
		});*/

		$stateProvider.state('details', {
			url: '/details',
			views: {
				main: {
					templateUrl: 'testTemplateRoute.html',
					controller: ['$scope', testRouteController]
				}
			}
		});
	}]);

	/** FILTER **/
	app.filter('reverse', function(){
		return function(input, parameter) {
			console.log(parameter);
			return (typeof input !== 'undefined') ? input+"hola" : "";
		};
	});

	//app.controller('testControllerForRouting', ['$scope', testRouteController]);
	function testRouteController($scope) {
		$scope.messageTest = 'donee';
	}

	app.controller('testController', ['$scope', 'factoryName', 'serviceName', '$http', '$q', productEditorController]);
	function productEditorController($scope, nameFactory, nameService, $http, $q) {
		$scope.path = 'texto de prueba';

		var objectTest = {
			message : "Not finish already"
		};
		$scope.objectTest = objectTest;

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

		/** FACTORY **/
		$scope.testFactoryInController = function(param) {
			nameFactory(param);
		};

		/** SERVICE **/
		$scope.testServiceInController = function(param) {
			nameService.alertFunction(param);
		};

		/** http service **/
		$scope.url = 'http://localhost:8080/curso-symfony/curso/web/app_dev.php/ong/create';
		$scope.httpFunction = function() {

			var defer = $q.defer();
			var promise = defer.promise;

			$http(
				{
					method: 'POST',
					url: $scope.url
				}
			).then(
				function(response) {
					console.log('done');
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

		$scope.httpCallDone = function() {
			console.log('previous', $scope.objectTest.message);
			$scope.httpFunction().then(
				function(response) {
					// success
					console.log('response', response);
					console.log('inside', $scope.objectTest.message);
					$scope.objectTest.message = 'Done!';
					console.log('inside but after', $scope.objectTest.message);
				},
				function() {
					// error
					$scope.objectTest.message = 'Error!';
				}
			)
		}

	};

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
	});


})(window.angular);
