var mongoose = require('mongoose');
var itemSchema = new mongoose.Schema({ 
	nome: String,
	qtde: String,
	preco: Number
});

exports.ListaSchema = new mongoose.Schema({
	nome: { type: String, required: true },
	data: { type: Date, required: false},
	itensComprar: [itemSchema],
	itensComprados: [itemSchema]
});