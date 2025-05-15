import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        // 🛑 Hardcoded Admin Credentials 🛑
        const adminEmail = "admin@laundry.com";
        const adminPassword = "Admin@123";

        if (email === adminEmail && password === adminPassword) {
            localStorage.setItem("admin", "true"); // Store session
            toast.success("Admin login successful!");
            navigate("/admin-dashboard"); // Redirect to Dashboard
        } else {
            toast.error("Invalid Admin Credentials");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Admin Login</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="emaill"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail("admin@laundry.com")}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="passwordd"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword("Admin@123")}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md text-lg font-semibold hover:bg-blue-600 transition duration-300"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
