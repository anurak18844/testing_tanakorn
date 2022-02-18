const express = require('express');
const app = express.Router();
const staffController = require('../controllers/staffController')
const auth = require('../middleware/auth');

app.post("/", auth,staffController.addStaff);

app.get("/", staffController.getStaff);

app.get("/:id", staffController.getStaffById);

app.get("/id/:id", staffController.getStaffByIdstaff);

app.put("/:id", auth,staffController.editWholeStaff);

app.delete("/:id", auth,staffController.deleteStaff);

app.post("/login", auth,staffController.login);


module.exports = app;