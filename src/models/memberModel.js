const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const memberSchema = new Schema({
    Std_id:{
        unique:true,
        type:String,
        required:true
    },
    Std_name:{
        type:String,
        required:true
    },
    Group_Learn:{
        type:String,
        required:true
    },
    Category:{
        type:String,
        required:true
    },
    Tel:{
        type:String,
        required:true
    },
    Address:{
        type:String,
        required:true
    },

},{
    timestamps: true,
});

module.exports = mongoose.model("Member", memberSchema);
