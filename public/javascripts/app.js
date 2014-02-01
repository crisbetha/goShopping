var app = angular.module('listas', ['ngRoute', 'listaServices']).
config(['$routeProvider', function($routeProvider) {
	$routeProvider.
		when('/', { templateUrl: 'views/index.html', controller: ListaTodasCtrl }).
		when('/listas', { templateUrl: 'views/dashboard.html', controller: ListaTodasCtrl }).
		when('/listas/:listaId', { templateUrl: 'views/lista.html', controller: ListaItemCtrl }).
		when('/listas/:listaId/editar', { templateUrl: 'views/editar.html', controller: EditarListaCtrl }).
		when('/nova', { templateUrl: 'views/nova.html', controller: NovaListaCtrl }).
		otherwise({ redirectTo: '/' });
}]);