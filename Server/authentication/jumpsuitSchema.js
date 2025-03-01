const mongoose = require("mongoose");

const JumpsuitSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    image: String, // Store image URL or file path
});

const Jumpsuit = mongoose.model("jumpsuit", JumpsuitSchema);

module.exports = Jumpsuit;
