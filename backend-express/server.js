const express = require("express");
const cors = require("cors");

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
    borrowerName: "null",
    loanDate: "null",
  },
  {
    id: 2,
    title: "Implementare API",
    author: "Paolo Brosio",
    isAvailable: true,
    borrowerName: "null",
    loanDate: "null",
  },
];

// GET lista books
app.get("/api/book", (req, res) => {
  res.json(books);
});

// POST aggiungi book
app.post("/api/book", (req, res) => {
  const newBook = req.body;
  newBook.id = books.length ? Math.max(...books.map((t) => t.id)) + 1 : 1;
  books.push(newBook);
  res.json(newBook);
});

// Avvia il server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
