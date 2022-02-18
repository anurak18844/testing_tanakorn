const express = require('express');
const app = express.Router();
const memberController = require('../controllers/memberController')
const auth = require('../middleware/auth');

app.post("/", auth,memberController.addMember);

app.get("/", memberController.getMembers )

app.put("/:id", auth,memberController.editWholeMember )

app.get("/:id", memberController.getMemberById )

app.delete("/:id", auth,memberController.deleteMember )

app.get("/id/:id", memberController.getMemberByIdmember )




module.exports = app;