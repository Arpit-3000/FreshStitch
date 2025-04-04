const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    isLoggedIn: { type: Boolean, default: false }
});

const userDetails = mongoose.model("userdetails", UserSchema);
module.exports = userDetails;
