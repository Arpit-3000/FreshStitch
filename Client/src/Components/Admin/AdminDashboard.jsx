import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { FaShoppingCart, FaClipboardList, FaChartBar, FaMoneyBillWave } from "react-icons/fa";
import Sidebar from "./Sidebar"; // ✅ Import Sidebar

const AdminDashboard = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const isAdmin = localStorage.getItem("admin");
        if (!isAdmin) {
            navigate("/admin-login"); // Redirect to Login if not admin
        }
    }, [navigate]);

    const [weeklyOrders] = useState([
        { day: "Saturday", placed: 4, completed: 2 },
        { day: "Sunday", placed: 3, completed: 1 },
        { day: "Monday", placed: 2, completed: 2 },
        { day: "Tuesday", placed: 3, completed: 3 },
        { day: "Wednesday", placed: 1, completed: 1 },
        { day: "Thursday", placed: 3, completed: 2 },
        { day: "Friday", placed: 4, completed: 2 },
    ]);

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <main className="flex-1 p-8 bg-gray-100">
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <div className="grid grid-cols-4 gap-4 mt-6">
                    <StatCard icon={<FaShoppingCart />} value="112" label="Total Orders" color="bg-red-500" />
                    <StatCard icon={<FaClipboardList />} value="81" label="Order Pending" color="bg-blue-500" />
                    <StatCard icon={<FaChartBar />} value="31" label="Order Completed" color="bg-green-500" />
                    <StatCard icon={<FaMoneyBillWave />} value="₹72,407" label="Total Earnings" color="bg-purple-500" />
                </div>

                {/* Charts */}
                <div className="grid grid-cols-2 gap-6 mt-8">
                    <Chart title="Weekly Orders" data={weeklyOrders} />
                </div>
            </main>
        </div>
    );
};

const StatCard = ({ icon, value, label, color }) => {
    return (
        <div className={`${color} p-5 rounded-lg text-white flex items-center space-x-3`}>
            <div className="text-3xl">{icon}</div>
            <div>
                <p className="text-xl font-bold">{value}</p>
                <p>{label}</p>
            </div>
        </div>
    );
};

const Chart = ({ title, data }) => {
    return (
        <div className="bg-white p-5 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">{title}</h2>
            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={data}>
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="placed" fill="#8884d8" name="Order Placed" />
                    <Bar dataKey="completed" fill="#82ca9d" name="Order Completed" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default AdminDashboard;
