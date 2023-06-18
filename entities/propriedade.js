class Propriedade { // como se fosse a sala
    constructor(codigo, nome, cor, valor, aluguel, proprietario, nome_proprietario) {
        this.codigo = codigo;
        this.nome = nome;
        this.cor = cor;
        this.valor = valor;
        this.aluguel = aluguel;
        this.proprietario = proprietario;
        this.nome_proprietario = nome_proprietario;
    }
}

module.exports = Propriedade;