const mysql = require("mysql2");

// Crea il pool di connessioni
const pool = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "root", // il tuo utente MySQL
  password: "admin", // la tua password MySQL
  database: "project2", // il database che userai
});

// Trasforma in promise per usare async/await
const db = pool.promise();

module.exports = db;
