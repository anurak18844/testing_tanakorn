const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { stringify } = require('nodemon/lib/utils');

const staffSchema = new Schema({
    Staff_id:{
        unique:true,
        type:String,
        required:true
    },
    Staff_name:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    },
    Address:{
        type:String,
        required:true
    },
    Tel:{
        type:String,
        required:true
    }

},{
    timestamps: true,
});

staffSchema.methods.hashPassword = async (password) => {
    return await bcrypt.hashSync(password, 10);
}
staffSchema.methods.compareUserPassword = async (inputtedPassword, hashedPassword) => {
    return await bcrypt.compare(inputtedPassword, hashedPassword)
}
staffSchema.methods.generateJwtToken = async (payload, secret, expires) => {
    return jwt.sign(payload, secret, expires)
}
module.exports = mongoose.model("Staff", staffSchema);
staffSchema.plugin(uniqueValidator, {
    message: '{PATH} Already in use'
});