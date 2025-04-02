const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const userDetails = require("./loginSchema.js");
require("./config.js");
const Order = require("./orderSchema.js");

const app = express();
const PORT = 3000;
const JWT_SECRET = "123456789";

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ✅ Fix for Google Authentication Popup Issue
app.use((req, res, next) => {
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
    res.setHeader("Cross-Origin-Embedder-Policy", "credentialless");
    next();
});

// ✅ Google Login Route
app.post("/auth/google", async (req, res) => {
    const { userId, email, username } = req.body;

    try {
        let user = await userDetails.findOne({ email });

        if (!user) {
            // ✅ If new user, create entry
            user = new userDetails({ userId, username, email, password: "" });
            await user.save();
        } else {
            // ✅ Update existing user info (if changed)
            user.username = username;
            user.userId = userId;
            await user.save();
        }

        // ✅ Generate JWT token
        const token = jwt.sign({ userId: user.userId, username: user.username }, JWT_SECRET, { expiresIn: "7d" });

        res.status(200).json({ token, message: "Google Login Successful" });
    } catch (error) {
        console.error("Google Auth Error:", error);
        res.status(500).json({ message: "Authentication Failed" });
    }
});
// ✅ Login Route
app.post("/login", async (req, res) => {
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

//Orders

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

  // Check if the email and bag are provided
  if (!req.body.email || !bag || bag.length === 0) {
    return res.status(400).json({ message: "Email and bag items are required to place an order." });
  }

  try {
    // Check if the email exists in the database
    const user = await userDetails.findOne({ email: email });

    if (!user) {
      return res.status(400).json({ message: "Email should be the same as during registration" });
    }

    // Create the new order with the order status set to "Order Placed"
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
      status: "Order Placed", // Set default status to "Order Placed"
    };

    // Save the order in the database
    const savedOrder = await Order.create(newOrder);

    // Send success response
    res.status(200).json({ message: "Order placed successfully", Order: savedOrder });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Error placing order" });
  }
});

app.get("/place-order", (req, res) => {
  Order.find()
    .then(orders => {
      const formattedOrders = orders.map(order => ({
        ...order._doc,
        totalItems: Array.isArray(order.items) ? order.items.length : 0,
        status: order.orderStatus || "Order Placed"  // Ensure the status is set to "Order Placed" if not present
      }));
      res.json(formattedOrders);
    })
    .catch((err) => res.status(500).send("Error fetching orders"));
});

// Update the status
app.put("/place-order/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;  // status here is coming from the frontend
  try {
    console.log("Received status update:", status);

    // Update the order status in the database, make sure you're updating `orderStatus`
    const updatedOrder = await Order.findByIdAndUpdate(id, { orderStatus: status }, { new: true });

    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    console.log("Updated order:", updatedOrder);

    // Send the updated order back to the frontend
    res.json(updatedOrder);
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ error: "Failed to update order status" });
  }
});


//CUSTOMERS DETAILS

app.get("/place-order", (req, res) => {
  Order.find()
    .then(orders => {
      const formattedOrders = orders.map(order => ({
        ...order._doc,
        totalItems: Array.isArray(order.items) ? order.items.length : 0,
        status: order.orderStatus || "Order Placed"  // Ensure the status is set to "Order Placed" if not present
      }));
      res.json(formattedOrders);
    })
    .catch((err) => res.status(500).send("Error fetching orders"));
});

// ✅ Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});