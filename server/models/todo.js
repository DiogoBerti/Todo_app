const mongoose = require('mongoose');

// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/TodoApp');
// Salvar algo novo...
// Criando Model para escrever no mongo...
var Todo = mongoose.model('Todo', {
	text: {
		// Tipo do campo
		type: String,
		// Se é obrigatório
		required: true,
		// tamanho minimo do campo (ainda aceita " " )
		minlength: 1,
		// Corta todos os espaços antes e depois da string
		trim: true
	},
	completed:{
		type: Boolean,
		default: false
	},
	completedAt:{
		type: Number,
		default: null
	}
});

// Fazendo a criação do Objeto que será gravado (tem de ser uma nova instancia do model)
// var newTodo = new Todo({
// 	text: "Kill your mother!",
// 	completed: true,
// 	completedAt:666
// });


// // Para gravar no banco, tem de chamar a função save()
// newTodo.save().then((doc) => {
// 	console.log('Saved Todo');
// 	console.log(doc);
// }, (err) => {
// 	console.log('Unable to save');
// });
module.exports = {Todo};