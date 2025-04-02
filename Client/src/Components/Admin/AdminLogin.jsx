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
            localStorage.setItem("admin", "true");  // Store session
            toast.success("Admin login successful!");
            navigate("/admin-dashboard");  // Redirect to Dashboard
        } else {
            toast.error("Invalid Admin Credentials");
        }
    };

    return (
        <div className="login-container">
            <h2>Admin Login</h2>
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Sign In</button>
            </form>
        </div>
    );
};

export default AdminLogin;
