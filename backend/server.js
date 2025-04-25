const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
let contactRoute = require('./routes/contactRoute.js')
let userRoute = require("./routes/userRoute.js")
let authRoute = require("./routes/authRoute.js")
const dotenv = require('dotenv')

dotenv.config()

app.use(cors(
    {
        credentials: true,
        origin: "http://localhost:5173",
        exposedHeaders: ["set-cookie"],
    }))

app.use(express.json({ limit: "1000mb", extended: true }));

app.use(cookieParser())

mongoose.connect(process.env.MONGO)
    .then(() => console.log("DB connected"))
    .catch((err) => console.log("Error", err));

app.use(contactRoute);

app.use("/send", (req, res) => {
    res.send("Hello!");
})

app.use("/api/user", userRoute)
app.use("/api/auth", authRoute)

app.use('/images', express.static('images'));

app.listen(5000, (req, res) => {
    console.log("Server start!");
})

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error"
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})