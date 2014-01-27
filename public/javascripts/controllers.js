
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
	$scope.excluirLista = function () {
			$scope.lista.$remove();
	  for (var i in $scope.listas) {
		  if ($scope.listas[i] == $scope.lista) {
	      $scope.listas.splice(i, 1);
	      
	    }
	  }
	  $location.path('/listas');
	};
	$scope.atualizarLista = function () {
		var lista = $scope.lista;
		lista.$update(function () {
			//$location.path('/listas');
			$location.path('/lista/' + $routeParams.listaId);
		});
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

function NovaListaCtrl($scope, $location, Lista) {
	$scope.tipos = ["und", "Kg", "l", "ml", "m", "cm"];
	$scope.exampleData = {
		    name: 'quantidades',
		    local: ['timtrueman', 'JakeHarding', 'vskarich']
		  };
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
			
		} else {
			alert('Você deve informar o nome da lista');
		}
	};
	
	
}