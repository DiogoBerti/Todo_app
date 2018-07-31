const mongoose = require('mongoose');

// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/TodoApp');

var User = mongoose.model('User',{
	email:{
		type: String,
		required: true,
		trim: true,
		minlength:1
	}
});

module.exports = {User};