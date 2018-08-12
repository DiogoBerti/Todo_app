const mongoose = require('mongoose');
const validator = require('validator');
// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/TodoApp');



var User = mongoose.model('User',{
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

module.exports = {User};