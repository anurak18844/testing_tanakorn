const express = require('express');
const app = express.Router();
const borrowController = require('../controllers/borrowController')
const auth = require('../middleware/auth');

app.post("/", auth,borrowController.borrowBook);

app.get("/:id", borrowController.getBorrowById);

app.delete("/:id" , auth,borrowController.deleteBorrow);

app.get("/" ,borrowController.getBorrow);

app.get("/std/:id" ,borrowController.getBorrowByStdId);

app.get("/book/:id" ,borrowController.getBorrowByBookId);

app.patch("/:id", auth,borrowController.returnBook);

module.exports = app;