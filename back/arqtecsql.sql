create database arqtec;

use arqtec;

CREATE TABLE usuarios(
	id INT auto_increment primary key,
    email VARCHAR(255),
    senha VARCHAR(255)
);

CREATE TABLE imagem(
	id INT auto_increment PRIMARY KEY,
    imagem varchar(255)
);

select * from imagem;

drop database arqtec_db;

select * from usuarios;