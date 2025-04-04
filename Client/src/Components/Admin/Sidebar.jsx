import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem("admin");  
        navigate("/admin-login");
    };

    // Sidebar items with routes & labels
    const menuItems = [
        { path: "/admin-dashboard", label: "📊 Dashboard" },
        { path: "/admin-orders", label: "📦 Orders" },
        { path: "/admin-products", label: "🛍 Products" },
        { path: "/admin-customers", label: "👥 Customers" },
        { path: "/admin-registration", label: "📝 Registration" },
        { path: "/admin-support", label: "💬 Support" },
    ];

    return (
        <aside className="w-64 bg-gradient-to-b from-cadetblue to-cadetdark text-white p-5 h-screen">
            <h2 className="text-2xl font-bold text-cream mb-10 mt-6 font-serif text-center">
                Smart Dhopa
            </h2>
            <nav className="space-y-3">
                {menuItems.map((item) => (
                    <p
                        key={item.path}
                        className={`cursor-pointer font-semibold font-serif text-xl p-3 rounded-lg transition-all 
                        ${
                            location.pathname === item.path 
                                ? "bg-white/10" // Active tab highlight
                                : "hover:bg-white/10"
                        }`}
                        onClick={() => navigate(item.path)}
                    >
                        {item.label}
                    </p>
                ))}
                <p
                    className="cursor-pointer font-semibold font-serif text-xl p-3 rounded-lg mt-20 hover:bg-red-500 transition-all"
                    onClick={handleLogout}
                >
                    🚪 Logout
                </p>
            </nav>
        </aside>
    );
};

export default Sidebar;
