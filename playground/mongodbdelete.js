// const MongoClient = require('mongodb').MongoClient;
// Mesma coisa do De cima...
const {MongoClient} = require('mongodb');

// Importando o Client do Mongo e fazendo a primeira conexão.
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if(err){
		return console.log('Unable to Connect to Database');
	}
	console.log('Connected to MongoDb server');

	// deleteMany
	// Função que deleta todos os itens que seguem o critério
	// db.collection('Todos').deleteMany({text: 'Eat Lunch'}).then((result) =>{
	// 	console.log(result);
	// }); 
	
	// deleteOne
	// A mesma que a de cima, mas deleta apenas o primeiro objeto que encontra
	// db.collection('Todos').deleteOne({text: 'Testing'}).then((result) => {
	// 	console.log(result);
	// });

	// findOneAndDelete
	// Encontra um registro e deleta, retornando o objeto!
	db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
		console.log(result);
	});

	// db.close();
});