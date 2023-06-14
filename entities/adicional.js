class Adicional { // como se fosse os equipamentos
    constructor(codigo, tipo, descricao, valor_adicional, propriedade){
        this.codigo = codigo;
        this.tipo = tipo;
        this.descricao = descricao;
        this.valor_adicional = valor_adicional;
        this.propriedade = propriedade;
    }
}

module.exports = Adicional;