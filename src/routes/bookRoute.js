const express = require('express');
const app = express.Router();
const bookController = require('../controllers/bookController')
const auth = require('../middleware/auth');

app.post("/", auth,bookController.addBook);

app.get("/", bookController.getBooks);

app.get("/:id", bookController.getBooksById);

app.get("/id/:id", bookController.getBooksByIdbook);

app.delete("/:id", auth,bookController.deleteBook);

app.put("/:id", auth,bookController.editWholeBook);



module.exports = app;