const express = require("express");
require("./config.js");
const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
const userDetails = require("./loginSchema.js");
const cors = require("cors");
const Order = require("./orderSchema.js");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const JWT_SECRET = "123456789";  


app.post("/login", async (req, res) => {
    console.log(req.body);  
    
    try {
        const user = await userDetails.findOne({ username: req.body.username });

        if (!user) {
            console.log("User not found:", req.body.username);
            return res.status(401).json({ message: "Wrong password or username" });
        }

        console.log("User found:", user.username);
        // console.log("Stored password hash:", user.password);

        // Trim the entered password and compare with stored hash
        // const enteredPassword = req.body.password.trim();  // Trim entered password (plain-text)
        // const storedHash = user.password;

        // Log entered password and stored hash for debugging
        // console.log("Entered password (trimmed):", enteredPassword);
        // console.log("Entered password length:", enteredPassword.length);
        // console.log("Stored password hash length:", storedHash.length);

        // Compare the entered password with the stored hash
         
        // const passwordMatch = bcrypt.compare(enteredPassword, storedHash);


       
        if (user.password === req.body.password) {
           
            const token = jwt.sign(
                { userId: user._id, username: user.username },
                JWT_SECRET,
                { expiresIn: '7d' }
            );
            res.status(200).json({ token });
        } else {
            console.log("Password mismatch");
            res.status(401).json("Wrong password or username");
        }
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Middleware to verify JWT Token
const verifyToken = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
        return res.status(403).json({ message: "Access denied, token required" });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid token" });
    }
};


app.get("/profile", verifyToken, (req, res) => {
    res.json({ message: `Welcome, ${req.user.username}` });
});

// Registration Bakcend
app.post("/register", async (req, res) => {
    const { username,email, password } = req.body;

   

    const newUser = new userDetails({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password
    });

    try {
        await newUser.save();
        console.log("User registered with password: ", newUser.password);
        console.log("User registered with email: ", newUser.email); 
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Error registering user" });
    }
});

app.post('/place-order', async (req, res) => {
    
      const {
        pickupDate,
        pickupTime,
        contactName,
        email,
        mobileNumber,
        address,
        paymentMethod,
        currentDate,
        bag,
        subtotal,
        DeliveryCharge,
        grandTotal,
      } = req.body;
      if (!req.body.email || !bag || bag.length === 0) {
        return res.status(400).json({ message: "Email and bag items are required to place an order." });
      }
  
  
    try {
      // Check if the email exists in the database
      const user = await userDetails.findOne({ email: email});
  
      if (!user) {
        return res.status(400).json({ message: "Email should be the same as during registration" });
        console.log("email enetered by the user:",email);
        console.log("email in bag by:",contactEmail);

        
      }
      console.log("email enetered by the user:",email);
      console.log("email in bag by:",email);

  
      // If email matches, save the order
      const newOrder = {
      pickupDate,
      pickupTime,
      contactName,
      email,
      mobileNumber,
      address,
      paymentMethod,
      currentDate,
      subtotal,
      DeliveryCharge,
      grandTotal,
      items: bag, // Store the bag items in the database
    };
  
    const savedOrder = await Order.create(newOrder);
      res.status(200).json({ message: "Order placed successfully",Order: savedOrder });
    } catch (error) {
      console.error("Error placing order:", error);
      res.status(500).json({ message: "Error placing order" });
    }
  });


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
