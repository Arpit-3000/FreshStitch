import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { FaShoppingCart, FaClipboardList, FaChartBar, FaMoneyBillWave } from "react-icons/fa";
import Sidebar from "./Sidebar"; 

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        totalOrders: 0,
        pendingOrders: 0,
        completedOrders: 0,
        totalEarnings: 0
    });

    const [weeklyOrders, setWeeklyOrders] = useState([]);

    useEffect(() => {
        const isAdmin = localStorage.getItem("admin");
        if (!isAdmin) {
            navigate("/admin-login");
        }

        fetchOrderStats();
        fetchWeeklyOrders();
    }, [navigate]);

    const fetchOrderStats = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/orders/order-stats");
            const data = await response.json();
            setStats(data);
        } catch (error) {
            console.error("Failed to fetch order statistics:", error);
        }
    };

    const fetchWeeklyOrders = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/orders/weekly-orders");
            const data = await response.json();
            setWeeklyOrders(data);
        } catch (error) {
            console.error("Failed to fetch weekly orders:", error);
        }
    };

    return (
        <div className="flex w-full h-screen overflow-hidden">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <main className="flex-1 min-h-screen bg-gray-100 p-6 overflow-auto">
                <h1 className="text-3xl font-bold text-center md:text-left">Admin Dashboard</h1>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                    <StatCard icon={<FaShoppingCart />} value={stats.totalOrders} label="Total Orders" color="bg-purple-900" />
                    <StatCard icon={<FaClipboardList />} value={stats.pendingOrders} label="Order Pending" color="bg-pink-900" />
                    <StatCard icon={<FaChartBar />} value={stats.completedOrders} label="Order Completed" color="bg-green-800" />
                    <StatCard icon={<FaMoneyBillWave />} value={`₹${stats.totalEarnings}`} label="Total Earnings" color="bg-cadetdark" />
                </div>

                {/* Real-time Weekly Orders Graph */}
                <div className="mt-10 p-6 rounded-lg shadow bg-white w-full max-w-6xl mx-auto">
                    <h2 className="text-2xl font-semibold mb-4 text-center">Weekly Orders</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={weeklyOrders} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <XAxis dataKey="day" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Order_Placed" fill="#9f1239" name="Order Placed" />
                            <Bar dataKey="Order_Completed" fill="#166534" name="Order Completed" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </main>
        </div>
    );
};

const StatCard = ({ icon, value, label, color }) => (
    <div className={`${color} p-5 rounded-lg text-white flex items-center space-x-3 shadow-md`}>
        <div className="text-3xl">{icon}</div>
        <div>
            <p className="text-xl font-bold">{value}</p>
            <p>{label}</p>
        </div>
    </div>
);

export default AdminDashboard;
