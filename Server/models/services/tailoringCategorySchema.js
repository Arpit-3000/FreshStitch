// models/Category.js
const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
    name: String,
    price: Number,
});

const CategorySchema = new mongoose.Schema({
    name: String,
    icon: String,
    items: [ItemSchema], // Array of items in this category
});

const tailoringCategory = mongoose.model("tailoringCategories", CategorySchema);

module.exports = tailoringCategory;
