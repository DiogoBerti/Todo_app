var {User} = require('./../models/user');

// Cria um middleware para autenticacao
var authenticate = (req, res, next) => {
	// Busca o Token na requisicao
	var token = req.header('x-auth');
	// Encontra o Usuario pelo token (setado em user.js)
	User.findByToken(token).then((user) =>{
		if(!user){
			// Retorna um reject caso não encontrar (cai direto no catch)
			return Promise.reject();
		}
		// Adiciona o usuario correto e token na requisicao (autentica)
		req.user = user;
		req.token = token;
		next(); 
	}).catch((e) =>{
		// Caso não tiver usuario com o token, rejeita a chamada
		res.status(401).send();
	});
};

module.exports = {authenticate};