CREATE DATABASE db_livros;

USE db_livros;

CREATE TABLE tbl_livros (
	id int NOT NULL auto_increment,
    nome varchar (45) NOT NULL,
    paginas long,
    genero varchar (45) NOT NULL,
    foto varchar (200) NOT NULL,
    primary key (id)
);

INSERT INTO tbl_livros(id,nome,paginas,genero,foto)values
	(0,"Os Três Mosqueteiros", 323,"Ação", "https://m.media-amazon.com/images/I/817bVkQAWhL.jpg"),
    (0,"O Iluminado", 464,"Terror", "https://m.media-amazon.com/images/I/8147kKLLvOL._AC_UF1000,1000_QL80_.jpg"),
    (0,"O Assassinato No Expresso Oriente", 240,"Romance Policial", "https://m.media-amazon.com/images/I/71qRxmALcsL._AC_UF1000,1000_QL80_.jpg");