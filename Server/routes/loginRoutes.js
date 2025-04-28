const express = require("express");
const jwt = require("jsonwebtoken");
const userDetails = require("../models/authentication/loginSchema.js");

const router = express.Router();
const JWT_SECRET = "123456789";


// ✅ Google Login Route
router.post("/auth/google", async (req, res) => {
    const { userId, email, username } = req.body;

    try {
        let user = await userDetails.findOne({ email });
    
        if (!user) {
            user = new userDetails({
                userId,
                email,
                username,
                isLoggedIn: true
            });
    
            await user.save()
                .then(savedUser => console.log("✅ New user saved:", savedUser))
                .catch(err => console.error("❌ Save error:", err)); // <== log here!
        } else {
            user.userId = userId;
            user.username = username;
            user.isLoggedIn = true;
            await user.save();
            console.log("🔁 Existing user updated:", user);
        }
    
        const token = email;
    
        res.status(200).json({
            token,
            message: "Google Login Successful",
            user: {
                id: user.userId,
                name: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.error("❌ Google Auth Error:", error);
        res.status(500).json({ message: "Authentication Failed" });
    }
    
});

// ✅ Login Route
router.post("/login", async (req, res) => {
    try {
        const user = await userDetails.findOne({ username: req.body.username });

        if (!user || user.password !== req.body.password) {
            return res.status(401).json({ message: "Wrong password or username" });
        }

        const token = jwt.sign({ userId: user._id, username: user.username }, JWT_SECRET, { expiresIn: "7d" });

        res.status(200).json({ token });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
