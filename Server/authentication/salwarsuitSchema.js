const mongoose = require("mongoose");

const SalwarSuitSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    image: String, // Store image URL or file path
});

const SalwarSuit = mongoose.model("salwarsuit", SalwarSuitSchema);

module.exports = SalwarSuit;
