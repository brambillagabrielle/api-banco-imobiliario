const { pool } = require('../config')
const Jogador = require('../entities/jogador')

const getJogadoresDB = async () => {
    try {
        const { rows } = await 
        pool.query('SELECT * FROM jogadores ORDER BY codigo');
        return rows.map((jogador) => new Jogador(jogador.codigo, jogador.nome,
            jogador.saldo));
    } catch(err){
        throw "Erro: " + err;
    }
}

const addJogadorDB = async (body) => {
    try {
        const { nome, saldo } = body;
        const results = await pool.query(`INSERT INTO jogadores (nome, saldo)
            VALUES ($1, $2) 
            RETURNING codigo, nome, saldo`, 
            [nome, saldo]);
        const jogador = results.rows[0];
        return new Jogador(jogador.codigo, jogador.nome, jogador.saldo);
    } catch (err){
        throw "Erro ao inserir o jogador: " + err;
    }
}

const updateJogadorDB = async (body) => {
    try {
        const { codigo, nome, saldo } = body;
        const results = await pool.query(`UPDATE jogadores SET nome=$1,
        saldo=$2 WHERE codigo=$3
        RETURNING codigo, nome, saldo`, 
            [nome, saldo, codigo]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para
            ser alterado`
        }
        const jogador = results.rows[0];
        return new Jogador(jogador.codigo, jogador.nome, jogador.saldo);
    } catch (err){
        throw "Erro ao alterar o jogador: " + err;
    }
}

const deleteJogadorDB = async (codigo) => {
    try {        
        const results = await pool.query(`DELETE FROM jogadores 
        WHERE codigo = $1`, [codigo]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para
            ser removido`
        } else {
            return `Jogador de código ${codigo} removido com sucesso!`
        }
    } catch (err){
        throw "Erro ao remover o jogador: " + err;
    }
}

const getJogadorPorCodigoDB = async (codigo) => {
    try {        
        const results = await pool.query(`SELECT * FROM jogadores 
        WHERE codigo = $1`, [codigo]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo}`
        } else {
            const jogador = results.rows[0];
            return new Jogador(jogador.codigo, jogador.nome,
                jogador.saldo);
        }
    } catch (err){
        throw "Erro ao recuperar o jogador: " + err;
    }
}

module.exports = { getJogadoresDB, addJogadorDB, 
    updateJogadorDB, deleteJogadorDB, getJogadorPorCodigoDB }