angular.module('listaServices', ['ngResource']).
factory('Lista', function($resource) {
	return $resource(
			'listas/:listaId', 
			{
				listaId:'@_id'
			},
			{
				query: { method: 'GET', params: { listaId: 'listas' }, isArray: true },
				update: {method: 'PUT' , isArray: false }
			})
});