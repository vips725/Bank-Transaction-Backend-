// server create karna aur server mai kitne apis hai usko config karna
const express = require("express");
const authRouter = require("./routes/auth.route")

const app = express();

app.use(express.json())

module.exports = app;
