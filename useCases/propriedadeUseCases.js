const { pool } = require('../config')
const Propriedade = require('../entities/propriedade')

const getPropriedadesDB = async () => {
    try {
        const { rows } = await 
        pool.query(`SELECT p.codigo AS codigo, p.nome AS nome, 
        p.cor AS cor, p.valor AS valor, 
        p.proprietario AS proprietario, j.nome AS nomeproprietario
        FROM propriedades p 
        JOIN jogadores j ON p.codigo = j.predio
        ORDER BY p.codigo`);
        return rows.map((propriedade) => new Propriedade(propriedade.codigo, propriedade.nome,
            propriedade.cor, propriedade.valor, propriedade.proprietario , propriedade.nome_proprietario));
    } catch(err){
        throw "Erro: " + err;
    }
}

const addPropriedadeDB = async (body) => {
    try {
        const { nome, cor, valor, proprietario } = body;
        const results = await pool.query(`INSERT INTO propriedades (nome,
            cor, valor, proprietario) VALUES ($1, $2, $3, $4) 
            RETURNING codigo, nome, cor, valor, proprietario`, 
            [nome, cor, valor, proprietario]);
        const propriedade = results.rows[0];
        return new Propriedade(propriedade.codigo, propriedade.nome,
            propriedade.cor, propriedade.valor, propriedade.proprietario , "");
    } catch (err){
        throw "Erro ao inserir a propriedade: " + err;
    }
}

const updatePropriedadeDB = async (body) => {
    try {
        const { codigo, nome, cor, valor, proprietario } = body;
        const results = await pool.query(`UPDATE propriedades SET nome=$1,
        cor=$2, valor = $3, proprietario = $4 WHERE codigo=$5 
        RETURNING codigo, nome, cor, valor, proprietario`, 
            [nome, cor, valor, proprietario, codigo]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para
            ser alterado`
        }
        const propriedade = results.rows[0];
        return new Propriedade(propriedade.codigo, propriedade.nome,
            propriedade.cor, propriedade.valor, propriedade.proprietario , "");        
    } catch (err){
        throw "Erro ao alterar a propriedade: " + err;
    }
}

const deletePropriedadeDB = async (codigo) => {
    try {        
        const results = await pool.query(`DELETE FROM propriedades 
        WHERE codigo = $1`, [codigo]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para
            ser removido`
        } else {
            return `Propriedade de código ${codigo} removida com sucesso!`
        }
    } catch (err){
        throw "Erro ao remover a propriedade: " + err;
    }
}

const getPropriedadePorCodigoDB = async (codigo) => {
    try {        
        const results = await pool.query(`SELECT * FROM propriedades 
        WHERE codigo = $1`, [codigo]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo}`
        } else {
            const propriedade = results.rows[0];
            return new Sala(propriedade.codigo, propriedade.nome,
                propriedade.cor, propriedade.valor, propriedade.proprietario , "");  
        }
    } catch (err){
        throw "Erro ao recuperar a propriedade: " + err;
    }
}

module.exports = { getPropriedadesDB, addPropriedadeDB, updatePropriedadeDB, 
    deletePropriedadeDB, getPropriedadePorCodigoDB }