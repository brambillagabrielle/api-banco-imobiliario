const { pool } = require('../config')
const Adicional = require('../entities/adicional')

const getAdicionaisPorPropriedadeDB = async (codigo_propriedade) => {
    try {
        const results = await
            pool.query(`SELECT * FROM adicionais WHERE propriedade = $1 
        ORDER BY codigo`, [codigo_propriedade]);
        if (results.rowCount === 0) {
            throw `Nenhum adicional encontrado com o código de 
            propriedade: ${codigo_propriedade}`;
        } else {
            return results.rows.map((adicional) =>
                new Adicional(adicional.codigo, adicional.tipo,
                    adicional.descricao, adicional.valor_adicional,
                    adicional.propriedade));
        }
    } catch (err) {
        throw "Erro: " + err;
    }
}

const addAdicionalDB = async (body) => {
    try {
        const { tipo, descricao, valor_adicional, propriedade } = body;
        const results = await pool.query(`INSERT INTO adicionais (tipo,
            descricao, valor_adicional, propriedade) VALUES ($1, $2, $3, $4) 
            RETURNING codigo, tipo, descricao, valor_adicional, propriedade`,
            [tipo, descricao, valor_adicional, propriedade]);
        const adicional = results.rows[0];
        return new Adicional(adicional.codigo, adicional.tipo,
            adicional.descricao, adicional.valor_adicional, adicional.propriedade);
    } catch (err) {
        throw "Erro ao inserir o adicional: " + err;
    }
}

const updateAdicionalDB = async (body) => {
    try {
        const { codigo, tipo, descricao, valor_adicional, propriedade } = body;
        const results = await pool.query(`UPDATE adicionais SET 
        tipo=$1, descricao=$2, valor_adicional=$3, propriedade=$4 WHERE codigo=$5 
        RETURNING codigo, tipo, descricao, valor_adicional, propriedade`,
            [tipo, descricao, valor_adicional, propriedade, codigo]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo} para
            ser alterado`
        }
        const adicional = results.rows[0];
        return new Adicional(adicional.codigo, adicional.tipo,
            adicional.descricao, adicional.valor_adicional,
            adicional.propriedade);
    } catch (err) {
        throw "Erro ao alterar o adicional: " + err;
    }
}

const deleteAdicionalDB = async (codigo) => {
    try {
        const results = await pool.query(`DELETE FROM adicionais 
        WHERE codigo = $1`, [codigo]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo} para
            ser removido`
        } else {
            return `Adicional de código ${codigo} removido com sucesso!`
        }
    } catch (err) {
        throw "Erro ao remover o adicional: " + err;
    }
}

const getAdicionalPorCodigoDB = async (codigo) => {
    try {
        const results = await pool.query(`SELECT * FROM adicionais 
        WHERE codigo = $1`, [codigo]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo}`
        } else {
            const adicional = results.rows[0];
            return new Adicional(adicional.codigo, adicional.tipo,
                adicional.descricao, adicional.valor_adicional,
                adicional.propriedade);
        }
    } catch (err) {
        throw "Erro ao recuperar o adicional: " + err;
    }
}

module.exports = {
    getAdicionaisPorPropriedadeDB, addAdicionalDB, updateAdicionalDB, 
    deleteAdicionalDB, getAdicionalPorCodigoDB
}