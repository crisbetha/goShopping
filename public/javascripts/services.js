angular.module('listaServices', ['ngResource']).
factory('Lista', function($resource) {
	return $resource(
			'listas/:listaId', 
			{
				listaId:'@_id'
			},
			{
				query: { method: 'GET', params: { listaId: 'listas' }, isArray: true },
				update: {method: 'PUT', params: { listaId: 'listas' }, isArray: true }
			})
}).
factory('UploadImagemService', function ($http) {
	  var api = {
	    uploadFile: function (file, callback) {
	      $http.uploadFile({
	        url: '/',
	        file: file
	      }).progress(function(event) {
	        console.log('percent: ' + parseInt(100.0 * event.loaded / event.total));
	      }).error(function (data, status, headers, config) {
	        console.error('Error uploading file')
	        callback(status);
	      }).then(function(data, status, headers, config) {
	        callback(null);
	      });
	    }
	  }
	  return api;
	});