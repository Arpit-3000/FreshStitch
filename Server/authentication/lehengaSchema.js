const mongoose = require("mongoose");

const LehengaSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    image: String, // Store image URL or file path
});

const Lehenga = mongoose.model("Lehenga", LehengaSchema);

module.exports = Lehenga;
