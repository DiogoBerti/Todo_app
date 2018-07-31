// const MongoClient = require('mongodb').MongoClient;
// Mesma coisa do De cima...
const {MongoClient} = require('mongodb');

// Importando o Client do Mongo e fazendo a primeira conexão.
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if(err){
		return console.log('Unable to Connect to Database');
	}
	console.log('Connected to MongoDb server');

	// db.collection('Todos').insertOne({
	// 	text: 'Something to Do',
	// 	completed: false
	// },(err, result)=>{
	// 	if(err){
	// 		return console.log('Cannot write to db');
	// 	}

	// 	console.log(JSON.stringify(result.ops, undefined, 2));
	// });

	// Adicionando um registro na tabela USERS (collection)
	// A Função insertOne insere um registro(objeto) na collection
	// e leva 2 argumentos: um objeto para inserir e uma callback com o 
	// Erro (se houver) e o resultado (result)
	db.collection('Users').insertOne({
		name: 'Ligia Alvarenga',
		age: 36,
		location: 'Osasco - SP'
	},(err, result)=>{
		if(err){
			return console.log('Cannot write to db');
		}

		console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));
	});

	db.close();
});