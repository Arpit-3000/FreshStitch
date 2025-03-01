// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const LaundryCategory = require("./laundrycategorySchema");
const TailoringCategory = require("./tailoringCategorySchema");
const Lehenga = require('./lehengaSchema');
const Jumpsuit = require('./jumpsuitSchema');
const SalwarSuit = require('./salwarsuitSchema');

const axios = require("axios");
const app = express();
app.use(express.json());
app.use(cors());
const port = 4000;

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/ExistingUsers", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Get Categories from MongoDB
app.get("/api/laundryCategories", async (req, res) => {
    try {
        const categories = await LaundryCategory.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get("/api/tailoringcategories", async (req, res) => {
    try {
        const categories = await TailoringCategory.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


app.get("/api/lehengaDesigns", async (req, res) => {
    try {
        const lehengaDesigns = await Lehenga.find();
        res.json(lehengaDesigns);
    } catch (err) {
        console.error("Error fetching lehenga designs:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.get("/api/SalwarSuitDesigns", async (req, res) => {
    try {
        const SalwarSuitDesigns = await SalwarSuit.find(); // Fetch only salwarsuits
        res.json(SalwarSuitDesigns);
    } catch (err) {
        console.error("Error fetching jumpsuit designs:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.get("/api/jumpsuitDesigns", async (req, res) => {
    try {
        const jumpsuitDesigns = await Jumpsuit.find(); // Fetch only jumpsuits
        res.json(jumpsuitDesigns);
    } catch (err) {
        console.error("Error fetching jumpsuit designs:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
