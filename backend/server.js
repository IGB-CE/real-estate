const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

const contactRoute = require('./routes/contactRoute.js');
const userRoute = require('./routes/userRoute.js');
const authRoute = require('./routes/authRoute.js');
const listingRoute = require('./routes/listingRoute.js')

dotenv.config();

const app = express();

// Middleware
app.use(cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true,              // allow cookies
}));

app.use(express.json({ limit: "1000mb", extended: true }));
app.use(cookieParser());

// Database connection
mongoose.connect(process.env.MONGO)
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
app.use('/api/contact', contactRoute);
app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/listing', listingRoute);

// Static files
app.use('/images', express.static('images'));

// Test endpoint (optional, you can remove later)
app.get("/send", (req, res) => {
    res.send("Hello from server!");
});

// Global error handler (must be before app.listen!)
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
