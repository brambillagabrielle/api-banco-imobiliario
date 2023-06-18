--- cria a tabela de jogadores
create table jogadores (
	codigo serial primary key,
	nome varchar(40) not null,
	saldo decimal not null
);

--- adiciona o jogador banqueiro
insert into jogadores values(0, 'Banqueiro', 1000000.00);

--- cria a tabela de propriedades
create table propriedades (
	codigo serial primary key,
	nome varchar(40) not null,
	cor varchar(40) not null,
	valor decimal not null,
	aluguel decimal not null,
	proprietario integer,
	foreign key (proprietario) references jogadores (codigo)
);

--- adiciona a tabela adicionais
create table adicionais (
	codigo serial primary key, 
	tipo varchar(40) not null, 
	descricao varchar(40) not null, 
	valor_adicional decimal not null, 
	propriedade integer,
	foreign key (propriedade) references propriedades(codigo)
);

--- adiciona a tabela usuários
create table usuarios (
        email varchar(50) not null primary key, 
        senha varchar(20) not null, 
        tipo char(1)  not null, 
        check (tipo = 'T' or tipo = 'A' or tipo = 'U'),
        telefone varchar(14)  not null, 
        nome varchar(50) not null
);

--- adiciona um usuário
insert into usuarios (email, senha, tipo, telefone, nome) 
values ('gabriellebrambillacc@gmail.com', '123456', 'A','(54)99999-9999','Gabrielle');
