
function ListaTodasCtrl($scope, $location, Lista) {
	
	$scope.listas = Lista.query();
	
	$scope.isActive = function(route) {
        return route === $location.path();
    }
}


function ListaItemCtrl($scope, $rootScope, $location, $routeParams, Lista) {
	$scope.confirmar = false;
	$scope.lista = Lista.get({listaId: $routeParams.listaId});
	$scope.confirmarExclusao = function() {
		$scope.confirmar = !$scope.confirmar;
	};
	$scope.itemComprado = function(item) {
		for (var i in $scope.lista.itensComprar) {
			if ($scope.lista.itensComprar[i] == item) {
				$scope.lista.itensComprar.splice(i, 1);
				$scope.lista.itensComprados.push(item);
			}
		}
		$scope.atualizarLista();
	}
	$scope.itemDevolvido = function(item) {
		for (var i in $scope.lista.itensComprados) {
			if ($scope.lista.itensComprados[i] == item) {
				$scope.lista.itensComprados.splice(i, 1);
				$scope.lista.itensComprar.push(item);
			}
		}
		$scope.atualizarLista();
	}
	$scope.excluirLista = function () {
			$scope.lista.$remove();
	  for (var i in $scope.listas) {
		  if ($scope.listas[i] == $scope.lista) {
	      $scope.listas.splice(i, 1);
	      
	    }
	  }
	  $location.path('/listas');
	};
	$scope.editarLista = function () {
		$location.path('/listas/' +  $routeParams.listaId + '/editar');
	}
	$scope.atualizarLista = function () {
		var lista = $scope.lista;
		lista.$update(function () {
			$scope.lista = lista;
		});
		$location.path();
	};
	$rootScope.modal = {
        show: false,
        title: '',
        body: '',
        ok: $scope.excluirLista,
        cancel: $scope.confirmarExclusao,
        buttons: false
    };
}
function EditarListaCtrl($scope, $location, $routeParams, Lista) {
	$scope.lista = Lista.get({listaId: $routeParams.listaId});
	
	$scope.salvarLista = function () {
		var lista = $scope.lista;
		lista.$update(function () {
			$scope.lista = lista;
		});
		$location.path('/listas');
		
	};
	$scope.addItem = function() {
		$scope.lista.itensComprar.push({ nome: '', count: $scope.lista.itensComprar.length + 1});
	};
	$scope.addItemByKey = function(e, count){
		if(e.keyCode == 9 && e.shiftKey	 == false) {
			if(count == $scope.lista.itensComprar.length){
				$scope.addItem();
			}
		}
	}
}
function NovaListaCtrl($scope, $location, Lista) {
	$scope.lista = {
		nome: '',
		data: new Date(),
		itensComprar: [ { nome: '', qtde: '', preco: '', count: 1 }],
		itensComprados: []
	};
	$scope.addItem = function() {
		$scope.lista.itensComprar.push({ nome: '', count: $scope.lista.itensComprar.length + 1});
	};
	$scope.addItemByKey = function(e, count){
		if(e.keyCode == 9 && e.shiftKey	 == false) {
			if(count == $scope.lista.itensComprar.length){
				$scope.addItem();
			}
		}
	}

	$scope.criarLista = function() {
		var lista = $scope.lista;
		if(lista.nome.length > 0) {
		var novaLista = new Lista(lista);
		novaLista.$save(function(p, resp) {
			if(!p.error) {
				$location.path('listas');
			} else {
				alert('Não foi possível criar a lista de compras');
			}
		});
			
		}
	};
	
	
}