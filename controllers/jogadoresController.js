const { getJogadoresDB, addJogadorDB, updateJogadorDB,
deleteJogadorDB, getJogadorPorCodigoDB } = require('../useCases/jogadorUseCases');

const getJogadores = async (request, response) => {
    await getJogadoresDB()
          .then(data => response.status(200).json(data))
          .catch(err => {
            response.status(400).json({
                status : 'error',
                message : 'Erro ao consultar os jogadores: ' + err
            })
          })
}

const addJogador = async (request, response) => {
    await addJogadorDB(request.body)
          .then(data => response.status(200).json({
            status : "success", message : "Jogador criado",
            objeto : data
          }))
          .catch(err => response.status(400).json({
            status : "error", message: err
          }))
}

const updateJogador = async (request, response) => {
    await updateJogadorDB(request.body)
          .then(data => response.status(200).json({
            status : "success", message : "Jogador alterado",
            objeto : data
          }))
          .catch(err => response.status(400).json({
            status : "error", message: err
          }))
}

const deleteJogador = async (request, response) => {
    await deleteJogadorDB(request.params.codigo)
          .then(data => response.status(200).json({
            status : "success", message : data
          }))
          .catch(err => response.status(400).json({
            status : "error", message: err
          }))
}

const getJogadorPorCodigo = async (request, response) => {
    await getJogadorPorCodigoDB(request.params.codigo)
          .then(data => response.status(200).json(data))
          .catch(err => response.status(400).json({
            status : "error", message: err
          }))
}

module.exports = { getJogadores, addJogador, 
    updateJogador, deleteJogador, getJogadorPorCodigo }