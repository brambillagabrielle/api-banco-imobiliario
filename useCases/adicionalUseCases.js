const { pool } = require('../config')
const Adicional = require('../entities/adicional')

const getAdicionaisPorPropriedadeDB = async (codigopropriedade) => {
    try {
        const results = await
            pool.query(`SELECT * FROM adicionais WHERE propriedade = $1 
        ORDER BY codigo`, [codigopropriedade]);
        if (results.rowCount === 0) {
            throw `Nenhum adicional encontrado com o código de 
            propriedade: ${codigopropriedade}`;
        } else {
            return results.rows.map((adicional) =>
                new Adicional(adicional.codigo, adicional.tipo,
                    adicional.valor_adicional, adicional.propriedade));
        }
    } catch (err) {
        throw "Erro: " + err;
    }
}

const addAdicionalDB = async (body) => {
    try {
        const { tipo, valor_adicional, propriedade } = body;
        const results = await pool.query(`INSERT INTO adicionais (tipo,
            valor_adicional, propriedade) VALUES ($1, $2, $3) 
            RETURNING codigo, tipo, valor_adicional, propriedade`,
            [tipo, valor_adicional, propriedade]);
        const adicional = results.rows[0];
        return new Adicional(adicional.codigo, adicional.tipo,
            adicional.valor_adicional, adicional.propriedade);
    } catch (err) {
        throw "Erro ao inserir o adicional: " + err;
    }
}

const updateAdicionalDB = async (body) => {
    try {
        const { codigo, tipo, valor_adicional, propriedade } = body;
        const results = await pool.query(`UPDATE adicionais SET 
        tipo=$1, valor_adicional=$2, propriedade=$3 WHERE codigo=$4 
        RETURNING codigo, tipo, valor_adicional, propriedade`,
            [tipo, valor_adicional, propriedade, codigo]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo} para
            ser alterado`
        }
        const adicional = results.rows[0];
        return new Adicional(adicional.codigo, adicional.tipo,
            adicional.valor_adicional, adicional.propriedade);
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
                adicional.valor_adicional, adicional.propriedade);
        }
    } catch (err) {
        throw "Erro ao recuperar o adicional: " + err;
    }
}

module.exports = {
    getAdicionaisPorPropriedadeDB, addAdicionalDB, updateAdicionalDB, 
    deleteAdicionalDB, getAdicionalPorCodigoDB
}