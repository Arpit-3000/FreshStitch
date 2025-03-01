const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email:{type: String,required: true},
    password: { type: String, required: true },
    
});

// // Pre-save hook to hash the password
// userSchema.pre("save", async function (next) {
//     if (this.isModified("password") || this.isNew) {  // Only hash the password if it's new or modified
//         const salt = await bcrypt.genSalt(10);
//         this.password = await bcrypt.hash(this.password, salt);
//     }
//     next();
// });

const userDetails = mongoose.model("userdetails", userSchema);
module.exports = userDetails;
