const {MongoClient} = require('mongodb');

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

	// Query que busca todos os registro com o campo completed setado para true
	// db.collection('Todos').find({completed: true}).toArray().then((documents)=>{
	// 	console.log('Todos:');
	// 	console.log(JSON.stringify(documents, undefined,2));
	// }, (err) => {
	// 	console.log('Unable to Fetch data...');
	// });

	// Conta os registros da busca...
	db.collection('Users').find({name: 'Diogo Berti'}).count().then((count)=>{
		console.log(`Users Count: ${count}`)
	}, (err) => {
		console.log('Unable to Fetch data...');
	});

	// db.close();
});