const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
const port = 8080;

app.use(
  cors({
    origin: "http://localhost:5173", // Permetti richieste dal frontend Vue
  })
);
app.use(express.json()); // Usa il parser JSON integrato di Express

let books = [
  {
    id: 1,
    title: "Studiare Vue.js",
    author: "Gerry Scorry",
    isAvailable: true,
    borrowerName: "Paolo Brosio",
    loanDate: "2025-07-12",
  },
  {
    id: 2,
    title: "Implementare API",
    author: "Paolo Brosio",
    isAvailable: true,
    borrowerName: "Gerry Scorry",
    loanDate: "2025-07-13",
  },
];

// GET lista books
app.get("/api/book", async (req, res) => {
  try {
    console.log("Tentativo di recupero books...");
    const [rows] = await db.query("SELECT * FROM books");
    console.log("books recuperate:", rows);
    res.json(rows);
  } catch (error) {
    console.error("Errore GET books - Dettagli completi:", error);
    console.error("Errore message:", error.message);
    console.error("Errore code:", error.code);
    res.status(500).json({ error: "Errore nel recupero books" });
  }
});

// POST aggiungi libri
app.post("/api/book", async (req, res) => {
  const { title, author, isAvailable, borrowerName, loanDate } = req.body;
  try {
    const [result] = await db.query(
      "INSERT INTO books (title, author, isAvailable, borrowerName, loanDate ) VALUES (?, ?, ?, ?, ?)",
      [title, author, isAvailable, borrowerName, loanDate]
    );
    const newBook = {
      id: result.insertId,
      title,
      author,
      isAvailable,
      borrowerName,
      loanDate,
    };
    res.json(newBook);
  } catch (error) {
    console.error("Errore POST book", error);
    res.status(500).json({ error: "Errore creazione libro" });
  }
});

// Avvia il server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
