const { getAdicionaisPorPropriedadeDB, addAdicionalDB, updateAdicionalDB,
  deleteAdicionalDB, getAdicionalPorCodigoDB } = require('../useCases/adicionalUseCases');

const getAdicionalPorPropriedade = async (request, response) => {
  await getAdicionaisPorSalaDB(request.params.codigosala)
    .then(data => response.status(200).json(data))
    .catch(err => {
      response.status(400).json({
        status: 'error',
        message: 'Erro ao consultar os adicionais da propriedade: ' + err
      })
    })
}

const addAdicional = async (request, response) => {
  await addAdicionalDB(request.body)
    .then(data => response.status(200).json({
      status: "success", message: "Adicional adicionado",
      objeto: data
    }))
    .catch(err => response.status(400).json({
      status: "error", message: err
    }))
}

const updateAdicional = async (request, response) => {
  await updateAdicionalDB(request.body)
    .then(data => response.status(200).json({
      status: "success", message: "Adicional alterado",
      objeto: data
    }))
    .catch(err => response.status(400).json({
      status: "error", message: err
    }))
}

const deleteAdicional = async (request, response) => {
  await deleteAdicionalDB(request.params.codigo)
    .then(data => response.status(200).json({
      status: "success", message: data
    }))
    .catch(err => response.status(400).json({
      status: "error", message: err
    }))
}

const getAdicionalPorCodigo = async (request, response) => {
  await getAdicionalPorCodigoDB(request.params.codigo)
    .then(data => response.status(200).json(data))
    .catch(err => response.status(400).json({
      status: "error", message: err
    }))
}

module.exports = {
  getAdicionalPorPropriedade, addAdicional, updateAdicional, 
  deleteAdicional, getAdicionalPorCodigo
}