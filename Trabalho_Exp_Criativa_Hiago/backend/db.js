import mysql from 'mysql2';

export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "0000",
  database: "expc"
});

db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
    return;
  }
  console.log("Conectado ao banco de dados MySQL com sucesso!");
});