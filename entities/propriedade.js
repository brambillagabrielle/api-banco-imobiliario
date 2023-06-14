class Propriedade { // como se fosse a sala
    constructor(codigo, nome, cor, valor, proprietario, nome_proprietario) {
        this.codigo = codigo;
        this.nome = nome;
        this.cor = cor;
        this.valor = valor;
        this.proprietario = proprietario;
        this.nome_proprietario = nome_proprietario;
    }
}

module.exports = Propriedade;