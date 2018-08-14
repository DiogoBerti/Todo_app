const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/TodoApp');

// Criando um Schema para os Users
var UserSchema = new mongoose.Schema({
	email:{
		type: String,
		required: true,
		trim: true,
		minlength:1,
		unique:true,
		validate: {
			validator: validator.isEmail,
			message: '{VALUE} is not a valid E-mail'
		}
	},

	password:{
		type: String,
		required: true,
		minlength: 6
	},
	tokens: [{
		access: {
			type: String,
			required: true
		},
		token: {
			type: String,
			required: true
		}
	}]
});

// Sobrescrevendo o metodo toJSON dos schemas (para retornar apenas o informado pelo pick)
UserSchema.methods.toJSON = function(){
	var user = this;
	var userObject = user.toObject();

	return _.pick(userObject, ['_id', 'email']);
};

// Adicionando um metodo para gerar o AuthToken (metodo de instancia)
UserSchema.methods.generateAuthToken = function(){
	var user = this;
	var access = 'auth';
	// Gerando o token... utilizando uma palavra magica
	var token = jwt.sign({_id: user._id.toHexString(), access}, 'satan666').toString();

	// Atualizando os Tokens do usuario (via concat)
	user.tokens = user.tokens.concat([{
		access,
		token
	}]);

	// Salvando o usuario e retornando uma promisse
	user.save().then(() => {
		return token;
	});
};


UserSchema.statics.findByToken = function(token){
	var User = this;
	var decoded;

	try{
		decoded = jwt.verify(token, 'satan666');
	}catch (e){
		// return new Promise((resolve, reject) => {
		// 	reject();
		// });
		return Promise.reject();
	}	


	return User.findOne({
		'_id': decoded._id,
		'tokens.token': token,
		'tokens.access': 'auth'			
	});
};

// Adicionando o Schema ao Model
var User = mongoose.model('User',UserSchema);

module.exports = {User};