// server create karna aur server mai kitne apis hai usko config karna
const express = require("express");
const authRouter = require("./routes/auth.route")
const cookieParser = require("cookie-parser")


const app = express();

app.use(express.json())
app.use(cookieParser())

app.route("/api/auth")

module.exports = app;
