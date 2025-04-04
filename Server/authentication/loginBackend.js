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

// ✅ Place Order Route
app.post("/place-order", async (req, res) => {
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
        DeliveryCharge
    } = req.body;

    const tokenEmail = req.headers.authorization;

    // Email and bag must be present
    if (!email || !bag || bag.length === 0) {
        return res.status(400).json({ message: "Email and bag items are required to place an order." });
    }

    // ✅ Only check if tokenEmail matches the entered email
    if (!tokenEmail || tokenEmail.toLowerCase() !== email.toLowerCase()) {
        return res.status(403).json({ message: "Email mismatch. You are not authorized to place this order." });
    }

    try {
        const grandTotal = Number(subtotal) + Number(DeliveryCharge);

        const newOrder = new Order({
            pickupDate,
            pickupTime,
            contactName,
            email,
            mobileNumber,
            address,
            paymentMethod,
            orderDate: new Date(),
            subtotal,
            DeliveryCharge,
            grandtotal: grandTotal,
            items: bag,
            orderStatus: "Order Placed"
        });

        const savedOrder = await newOrder.save();

        res.status(200).json({ message: "Order placed successfully", Order: savedOrder });
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ message: "Error placing order" });
    }
});


// ✅ Fetch All Orders
app.get("/place-order", async (req, res) => {
    try {
        const orders = await Order.find().lean(); // Lean for performance optimization

        if (!orders.length) {
            return res.status(404).json({ message: "No orders found" });
        }

        const formattedOrders = orders.map(order => ({
            ...order,
            totalItems: Array.isArray(order.items) ? order.items.length : 0,
            status: order.orderStatus || "Order Placed",
            email: order.email || ""
        }));

        res.json(formattedOrders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ error: "Error fetching orders" });
    }
});

// ✅ Update Order Status
app.put("/place-order/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        console.log("Received status update:", status);

        const updatedOrder = await Order.findByIdAndUpdate(id, { orderStatus: status }, { new: true });

        if (!updatedOrder) {
            return res.status(404).json({ error: "Order not found" });
        }

        console.log("Updated order:", updatedOrder);

        res.json(updatedOrder);
    } catch (error) {
        console.error("Error updating order status:", error);
        res.status(500).json({ error: "Failed to update order status" });
    }
});

// ✅ Order Statistics (Dashboard)
app.get("/order-stats", async (req, res) => {
    try {
        const totalOrders = await Order.countDocuments();
        const pendingOrders = await Order.countDocuments({
            orderStatus: { $in: ["Order Placed", "Order Delivered", "Order Processing", "Order Picked"] }
        });
        const completedOrders = await Order.countDocuments({ orderStatus: "Order Completed" });

        const totalEarnings = await Order.aggregate([
            { $group: { _id: null, total: { $sum: "$grandtotal" } } }
        ]);

        res.json({
            totalOrders,
            pendingOrders,
            completedOrders,
            totalEarnings: totalEarnings.length > 0 ? totalEarnings[0].total : 0
        });
    } catch (error) {
        console.error("Error fetching order stats:", error);
        res.status(500).json({ message: "Failed to fetch order statistics" });
    }
});

// ✅ Weekly Orders Graph Data
app.get("/weekly-orders", async (req, res) => {
    try {
        const weeklyOrders = await Order.aggregate([
            {
                $group: {
                    _id: { $dayOfWeek: "$orderDate" },
                    Order_Placed: { $sum: 1 },
                    Order_Completed: { $sum: { $cond: [{ $eq: ["$orderStatus", "Order Completed"] }, 1, 0] } }
                }
            },
            { $sort: { "_id": 1 } }
        ]);

        const dayMapping = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const formattedData = weeklyOrders.map(entry => ({
            day: dayMapping[entry._id - 1],
            Order_Placed: entry.Order_Placed,
            Order_Completed: entry.Order_Completed
        }));

        res.json(formattedData);
    } catch (error) {
        console.error("Error fetching weekly orders:", error);
        res.status(500).json({ message: "Failed to fetch weekly orders" });
    }
});

// ✅ Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
