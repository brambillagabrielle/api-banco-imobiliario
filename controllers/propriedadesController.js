const { getPropriedadesDB, addPropriedadeDB, updatePropriedadeDB,
  deletePropriedadeDB, getPropriedadePorCodigoDB } = require('../useCases/propriedadeUseCases');

const getPropriedades = async (request, response) => {
  await getPropriedadesDB()
    .then(data => response.status(200).json(data))
    .catch(err => {
      response.status(400).json({
        status: 'error',
        message: 'Erro ao consultar as propriedades: ' + err
      })
    })
}

const addPropriedade = async (request, response) => {
  await addPropriedadeDB(request.body)
    .then(data => response.status(200).json({
      status: "success", message: "Propriedade criada",
      objeto: data
    }))
    .catch(err => response.status(400).json({
      status: "error", message: err
    }))
}

const updatePropriedade = async (request, response) => {
  await updatePropriedadeDB(request.body)
    .then(data => response.status(200).json({
      status: "success", message: "Propriedade alterada",
      objeto: data
    }))
    .catch(err => response.status(400).json({
      status: "error", message: err
    }))
}

const deletePropriedade = async (request, response) => {
  await deletePropriedadeDB(request.params.codigo)
    .then(data => response.status(200).json({
      status: "success", message: data
    }))
    .catch(err => response.status(400).json({
      status: "error", message: err
    }))
}

const getPropriedadePorCodigo = async (request, response) => {
  await getPropriedadePorCodigoDB(request.params.codigo)
    .then(data => response.status(200).json(data))
    .catch(err => response.status(400).json({
      status: "error", message: err
    }))
}

module.exports = {
  getPropriedades, addPropriedade, updatePropriedade,
  deletePropriedade, getPropriedadePorCodigo
}