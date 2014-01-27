var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://criscoder:projetobetha@ds037737.mongolab.com:37737/compras');
var ListaSchema = require('../models/Lista.js').ListaSchema;
var Lista = db.model('listas', ListaSchema);

exports.index = function(req, res) {
	res.render('index');
};

exports.listaTodas = function(req, res) {
	Lista.find({}).sort({data: 'desc'}).exec(function(error, listas) {
        if(error) res.send(500);

        res.json(listas);
	});
};

exports.lista = function(req, res) {
	var listaId = req.params.id;
	Lista.findById(listaId, '', { lean: true }, function(err, lista) {
		if(lista) {
			res.json(lista);
		} else {
			res.json({error:true});
		}
	});
};

// Cria uma nova lista de compras
exports.criarLista = function(req, res) {
	var reqBody = req.body, itensComprar = reqBody.itensComprar.filter(function(i) { return i.nome != ''; }),
	listaObj = {nome: reqBody.nome, data: reqBody.data, itensComprar : itensComprar, itensComprados : []};
	var lista = new Lista(listaObj);

	lista.save(function(err, doc) {
		if(err || !doc) {
			throw 'Error';
		} else {
			res.json(doc);
		}		
	});
};

exports.atualizarLista = function(req, res){
	var reqBody = req.body;
	var listaId = req.params.id;
	Lista.findByIdAndUpdate(listaId, { $set: { itensComprar: reqBody.itensComprar, itensComprados : reqBody.itensComprados }}, function(err){
    if (err) {
      res.render('error', {status: 500});
    }  else {
    	res.jsonp(1);
    }
  });
};
exports.excluirLista = function(req, res){
	var listaId = req.params.id;
	Lista.findByIdAndRemove(listaId, function(err){
    if (err) {
      res.render('error', {status: 500});
    }  else {
    	res.jsonp(1);
    }
  });
};