-- Active: 1677702208233@@127.0.0.1@3306
CREATE TABLE musics (
  id TEXT PRIMARY KEY UNIQUE NOT NULL,
  name TEXT NOT NULL,
  artist TEXT NOT NULL,
  minutes REAL NOT NULL
);

INSERT INTO musics (id, name, artist, minutes)
VALUES 
("m001", "Diário de um Detento", "Racionais MC's", 7.3),
("m002", "Periferia É Periferia", "Racionais MC's", 5.5),
("m003", "Ponto Riscado", "Sé da Rua", 4.6),
("m004", "Presencia", "Danit", 5.3);

SELECT * FROM musics;

