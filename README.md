Libreria

per runnare il frontend
cd vue-frontend
npm i
npm run dev

per runnare il backend
cd backend-express
npm i
node server

table books (mysql)
create table books (
id INT PRIMARY KEY,
title CHAR(200) NOT NULL,
author CHAR(100) NOT NULL,
isAvailable BOOLEAN DEFAULT TRUE,
borrowerName CHAR(100) NOT NULL,
loanDate DATE
)

da fare: 
navbar con link, 
pagina dei libri,
eliminazione, prestito e ritorno del prestito 
