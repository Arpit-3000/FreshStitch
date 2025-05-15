const express = require("express");
const Order = require("../models/orders/orderSchema.js");

const router = express.Router();

// Place Order
router.post("/place-order", async (req, res) => {
    const {
        pickupDate,
        pickupTime,
        contactName,
        email,
        mobileNumber,
        address,
        paymentMethod,
        bag,
        subtotal,
        DeliveryCharge
    } = req.body;

    const tokenEmail = req.headers.authorization;

    if (!email || !bag || bag.length === 0) {
        return res.status(400).json({ message: "Email and bag items are required to place an order." });
    }

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
        res.status(500).json({ message: "Error placing order" });
    }
});

// Fetch all Orders
router.get("/place-order", async (req, res) => {
    try {
        const orders = await Order.find().lean();

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
        res.status(500).json({ error: "Error fetching orders" });
    }
});

// Update Order Status
router.put("/place-order/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const updatedOrder = await Order.findByIdAndUpdate(id, { orderStatus: status }, { new: true });

        if (!updatedOrder) {
            return res.status(404).json({ error: "Order not found" });
        }

        res.json(updatedOrder);
    } catch (error) {
        res.status(500).json({ error: "Failed to update order status" });
    }
});
// DRd6D8EThb0KXchi
// Order Statistics
router.get("/order-stats", async (req, res) => {
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
        res.status(500).json({ message: "Failed to fetch order statistics" });
    }
});

// Weekly Orders Graph Data
router.get("/weekly-orders", async (req, res) => {
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
        res.status(500).json({ message: "Failed to fetch weekly orders" });
    }
});

module.exports = router;
