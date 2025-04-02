import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("admin");  // Logout admin
        navigate("/admin-login");
    };

    return (
        <aside className="w-64 bg-gradient-to-b from-cadetblue to-cadetdark text-white p-5 space-y-6 h-screen">
            <h2 className="text-2xl font-bold text-cream mb-11 mt-6 font-serif">Smart Dhopa</h2>
            <nav className="space-y-7">
                <p className="cursor-pointer font-semibold font-serif  text-xl" onClick={() => navigate("/admin-dashboard")}>📊 Dashboard</p>
                <p className="cursor-pointer font-semibold font-serif text-xl" onClick={() => navigate("/admin-orders")}>📦 Orders</p>
                <p className="cursor-pointer font-semibold font-serif text-xl" onClick={() => navigate("/admin-products")}>🛍 Products</p>
                <p className="cursor-pointer font-semibold font-serif  text-xl" onClick={() => navigate("/admin-customers")}>👥 Customers</p>
                <p className="cursor-pointer font-semibold font-serif  text-xl" onClick={() => navigate("/admin-registration")}>📝 Registration</p>
                <p className="cursor-pointer font-semibold font-serif text-xl" onClick={() => navigate("/admin-support")}>💬 Support</p>
                <p className="cursor-pointer font-semibold font-serif text-xl pt-36" onClick={handleLogout}>🚪 Logout</p>
            </nav>
        </aside>
    );
};

export default Sidebar;
