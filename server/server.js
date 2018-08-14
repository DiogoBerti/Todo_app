const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
var {mongoose} = require('./db/mongoose'); 
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
	var todo = new Todo({
		text: req.body.text
	});
	todo.save().then((doc) => {
		res.send(doc);
	}, (err) => {
		res.status(400).send(err);
	});
});

app.get('/todos', (req, res) => {
	Todo.find().then((todos) => {
		res.send({todos});
	}, (err) =>{
		res.status(400).send(err);
	});
});

app.get('/todos/:id', (req, res) => {
	
	var id = req.params.id;
	if(!ObjectID.isValid(id)){
		return res.status(404).send();
	}

	Todo.findById(id).then((todo) => {
		if (!todo) {
		    return res.send({'error': "Not Found"});
		  }
		  console.log('Todo By Id', todo);
		  return res.send({todo});
	}).catch((e) => res.send({'error': e}));
});

// Rota para deletar um Todo por ID
app.delete('/todos/:id', (req, res) => {
	var id = req.params.id;
	if(!ObjectID.isValid(id)){
		return res.status(404).send();
	}
	Todo.findByIdAndRemove(id).then((todo) => {
		if(todo){
			res.status(200).send();
		}else{
			res.status(404).send();
		}
	}).catch((e) => res.send({'error': e}));

});

// Rota para update (usando o metodo http Patch)
app.patch('/todos/:id', (req, res) => {
	var id = req.params.id;
	// Utilizando o LoDash, a função pick busca na mensagem apenas os campos informados no array
	var body = _.pick(req.body, ['text', 'completed']);

	if(!ObjectID.isValid(id)){
		return res.status(404).send();
	}

	if (_.isBoolean(body.completed) && body.completed){
		// Seta a data do completedAt usando uma funcao do objeto Date 
		body.completedAt = new Date().getTime();
	}else{
		body.completed = false;
		body.completedAt = null;
	}

	Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) =>{
		if(!todo){
			res.status(404).send();
		}

		res.send({todo});

	}).catch((e) => {
		res.status(400).send();
	});

});

// Rotas para Users
// Criação de Usuario...
app.post('/users', (req, res) => {
	// Usando Lodash para pegar os campos que estão no array e transformando em um objeto.
	var body = _.pick(req.body, ['email', 'password', 'tokens']);
	var user = new User(body);
	
	user.save().then(() => {
		// Ao salvar, gera uma token
		return user.generateAuthToken();
	}).then((token) => {
		// Envia a token pelo header
		res.header('x-auth', token).send(user);
	}).catch((err) => {
		res.status(400).send(err);
	});
});

// Funçao de rota privada... checa os tokens para validar o user...
// Utilizacao do middleware authenticate, criado para transformar a rota em privada...
app.get('/users/me', authenticate,(req, res) => {
	// Função antiga de autenticacao...
	// var token = req.header('x-auth');
	// User.findByToken(token).then((user) =>{
	// 	if(!user){
	// 		return Promise.reject();
	// 	}
	// 	res.send(user);
	// }).catch((e) =>{
	// 	res.status(401).send();
	// });
	res.send(req.user);
});

app.listen(port, ()=>{
	console.log(`Started on port ${port}`);
});

module.exports = {app};