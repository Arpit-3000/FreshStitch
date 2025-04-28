const mongoose = require("mongoose");

const ShirtSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    image: String, // Store image URL or file path
});

const Shirt = mongoose.model("Shirt", ShirtSchema);

module.exports = Shirt;
