const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { stringify } = require("nodemon/lib/utils");
const Schema = mongoose.Schema;

const borrowSchema = new Schema ({
   Student: {
       Std_id: String,
       Std_name: String
   },
   Book:{
       Book_id:String,
       Book_name:String
   },
   Lender:{
       Staff_id:String,
       Staff_name:String
   },
   Receiver:{
    Staff_id:String,
    Staff_name:String
   },
   borrowDate: { type: Date, default: Date.now },
   datetoreturn: Date,
   
   returnDate: Date
}, { timestamps: true });

// export Product Schema to be usable in other components
module.exports = mongoose.model("Borrow", borrowSchema);