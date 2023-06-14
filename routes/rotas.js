const { Router } = require('express');

const { getJogadores, addJogador, updateJogador,
     deleteJogador, getJogadorPorCodigo } = require('../controllers/jogadoresController')

const { login, verificaJWT } = require('../controllers/segurancaController');

const rotas = new Router();

rotas.route('/login')
     .post(login);

rotas.route('/jogadores')
     .get(verificaJWT, getJogadores)
     .post(verificaJWT, addJogador)
     .put(verificaJWT, updateJogador);

rotas.route('/jogadores/:codigo')
     .get(verificaJWT, getJogadorPorCodigo)
     .delete(verificaJWT, deleteJogador);

const { getPropriedades, addPropriedade, updatePropriedade,
     deletePropriedade, getPropriedadePorCodigo }
     = require('../controllers/propriedadesController');

rotas.route('/propriedades')
     .get(verificaJWT, getPropriedades)
     .post(verificaJWT, addPropriedade)
     .put(verificaJWT, updatePropriedade);

rotas.route('/propriedades/:codigo')
     .get(verificaJWT, getPropriedadePorCodigo)
     .delete(verificaJWT, deletePropriedade);

const { getAdicionalPorPropriedade, addAdicional, updateAdicional,
     deleteAdicional, getAdicionalPorCodigo } =
     require('../controllers/adicionaisController');

rotas.route('/adicionais/propriedade/:codigopropriedade')
     .get(verificaJWT, getAdicionalPorPropriedade)

rotas.route('/adicionais')
     .post(verificaJWT, addAdicional)
     .put(verificaJWT, updateAdicional);

rotas.route('/adicionais/:codigo')
     .get(verificaJWT, getAdicionalPorCodigo)
     .delete(verificaJWT, deleteAdicional);

module.exports = rotas;