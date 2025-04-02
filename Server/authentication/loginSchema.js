const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true }, // Firebase UID
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
});

const userDetails = mongoose.model("userdetails", UserSchema);
module.exports = userDetails;
