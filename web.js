/*
 * goShopping
 * App para organizar as listas de compras
 * Projeto do processo seletivo da Betha Sistemas Ltda.
 * Cristiano Soares 26/01/2014
 */

var express = require('express');
var logfmt = require("logfmt");
var routes = require('./routes');
var http = require('http');
var path = require('path');
var app = express();

app.use(logfmt.requestLogger());
app.set('port', process.env.VCAP_APP_PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(err, req, res, next) {
	if(!err) return next();
	console.log(err.stack);
	res.json({error: true});
});

app.get('/', routes.index);
app.get('/listas/listas', routes.listaTodas);
app.get('/listas/:id', routes.lista);

app.post('/listas', routes.criarLista);
app.del('/listas/:id', routes.excluirLista);
app.put('/listas/:id/editar', routes.salvarLista);
app.put('/listas/:id', routes.salvarLista);


var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});