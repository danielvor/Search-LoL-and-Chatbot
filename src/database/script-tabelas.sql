CREATE DATABASE search;

USE search;

CREATE TABLE usuario (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(50),
	email VARCHAR(50),
	senha VARCHAR(50)
);

INSERT INTO usuario (nome, eail, senha) VALUES ('Nome do Usuário', 'usuario@email.com', 'senha');
SELECT * FROM usuario WHERE email = 'email_do_usuario' AND senha = 'senha_do_usuario';


