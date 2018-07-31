// const MongoClient = require('mongodb').MongoClient;
// Mesma coisa do De cima...
const {MongoClient, ObjectID} = require('mongodb');

// Importando o Client do Mongo e fazendo a primeira conexão.
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if(err){
		return console.log('Unable to Connect to Database');
	}
	console.log('Connected to MongoDb server');

	// db.collection('Todos').findOneAndUpdate({
	// 	_id: new ObjectID('5b5e3cfa0e736d39fac2fe58')
	// },{
	// 	$set:{
	// 		completed: true
	// 	}
	// },{
	// 	returnOriginal: false
	// }).then((result) => {
	// 	console.log(result);
	// });

	db.collection('Users').findOneAndUpdate({
		_id: new ObjectID('5b5e137a1620ad03b75e7ada')
	},{
		$set:{
			name: "Ligia Alvarenga"
		},
		$inc:{
			age: 1
		}
	},{
		returnOriginal: false
	}).then((result) => {
		console.log(result);
	});
	// db.close();
});