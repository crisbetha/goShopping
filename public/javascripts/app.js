angular.module('listas', ['ngRoute', 'listaServices']).
config(['$routeProvider', function($routeProvider) {
	$routeProvider.
		when('/', { templateUrl: 'views/index.html', controller: ListaTodasCtrl }).
		when('/listas', { templateUrl: 'views/dashboard.html', controller: ListaTodasCtrl }).
		when('/lista/:listaId', { templateUrl: 'views/lista.html', controller: ListaItemCtrl }).
		when('/nova', { templateUrl: 'views/nova.html', controller: NovaListaCtrl }).
		otherwise({ redirectTo: '/' });
}]);