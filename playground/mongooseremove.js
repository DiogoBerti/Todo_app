const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Metodo que remove tudo da tabela..
// Todo.remove({}).then((result) => {
// 	console.log(result);
// });

// Metodos de remoção, um por id e o outr por qqr outro campo
// Todo.findOneAndRemove({})
// Todo.findByIdAndRemove({})

Todo.findByIdAndRemove('5b6f6b3530551d03ef8acb0b').then((doc) => {
	console.log(doc);
});
