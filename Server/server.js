const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
// Routes
const loginRoutes = require('./routes/loginRoutes');
const orderRoutes = require('./routes/orderRoutes');
const categoryRoutes = require("./routes/categoryRoutes");

require('./config/config.js');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ✅ Fix for Google Authentication Popup
app.use((req, res, next) => {
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
    res.setHeader("Cross-Origin-Embedder-Policy", "credentialless");
    next();
});

// Use the routes
app.use('/api/login', loginRoutes);
app.use('/api/orders', orderRoutes);
app.use("/api", categoryRoutes);


// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
