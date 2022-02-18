require('dotenv').config({path: './config.env'});
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 4002;

const memberRoute = require("./routes/memberRoute");
const bookRoute = require("./routes/bookRoute");
const staffRoute = require("./routes/staffRoute");
const borrowRoute = require("./routes/borrowRoute");

const app = express();
app.use(cors());
app.use(bodyParser.json());

require("./db")(app);

app.use("/book", bookRoute);
app.use("/member", memberRoute);
app.use("/staff", staffRoute);
app.use("/borrow", borrowRoute);

// app.use("/staff", staffRoute);

app.get("/",(req, res)=>{
    res.send("Hello World");
});
app.listen(port,()=>{
    console.log("App is running on port : "+port);
})