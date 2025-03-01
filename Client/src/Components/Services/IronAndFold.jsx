import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const IronAndFoldDetails = () => {
    const [bag, setBag] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const DeliveryCharge = 5;

    const navigate = useNavigate();
    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to top when this page loads
      }, []);

    // Add item to the bag
    const addItem = (item) => {
        const existingItem = bag.find((bagItem) => bagItem.name === item.name);

        if (existingItem) {
            const updatedBag = bag.map((bagItem) =>
                bagItem.name === item.name
                    ? { ...bagItem, quantity: bagItem.quantity + 1 }
                    : bagItem
            );
            setBag(updatedBag);
        } else {
            setBag([...bag, { ...item, quantity: 1 }]);
        }
        setSubtotal(subtotal + item.price);
    };

    // Remove item from the bag
    const removeItem = (item) => {
        const existingItem = bag.find((bagItem) => bagItem.name === item.name);

        if (existingItem && existingItem.quantity > 1) {
            const updatedBag = bag.map((bagItem) =>
                bagItem.name === item.name ? { ...bagItem, quantity: bagItem.quantity - 1 } : bagItem
            );
            setBag(updatedBag);
        } else {
            setBag(bag.filter((bagItem) => bagItem.name !== item.name));
        }
        setSubtotal(subtotal - item.price);
    };

    const grandTotal = subtotal + DeliveryCharge;

    const mensItems = [
        { name: "Shawl", price: 10 },
        { name: "Jubba", price: 20 },
        { name: "Suit (Blazer + Trouser)", price: 30 },
    ];

    const womensItems = [
        { name: "Home Wear", price: 15 },
        { name: "Jar", price: 25 },
        { name: "Kameez", price: 20 },
        { name: "Sarree", price: 40 },
    ];

    const renderAddButton = (item) => {
        const existingItem = bag.find((bagItem) => bagItem.name === item.name);

        if (existingItem) {
            return (
                <div className="flex items-center">
                    <button onClick={() => removeItem(item)} className="px-3 py-1 bg-gray-400 text-white rounded-l">-</button>
                    <span className="px-3 py-1 bg-white text-black border-t border-b">{existingItem.quantity}</span>
                    <button onClick={() => addItem(item)} className="px-3 py-1 bg-cadetblue text-white rounded-r">+</button>
                </div>
            );
        } else {
            return (
                <button onClick={() => addItem(item)} className="ml-4 px-4 py-2 bg-cadetblue text-white rounded hover:bg-cadetdark transition-colors">
                    Add to Bag
                </button>
            );
        }
    };
    const handleProceedToCheckout = () => {
        const token = localStorage.getItem('token'); // Check if the user is logged in (by checking token)
        if (token) {
          navigate("/cart"); // Navigate to the checkout (cart) page if logged in
        } else {
          navigate("/LoginPage"); // Redirect to the login page if not logged in
        }
      };

    return (
        <div className="sewing-details flex flex-col md:flex-row p-8 bg-gray-50">
            {/* Left Section - Items */}
            <div className="flex-grow mb-8 md:mb-0 md:mr-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Iron and Fold Service</h1>

                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Men's Items</h2>
                <ul className="mb-8">
                    {mensItems.map((item, index) => (
                        <li key={index} className="flex justify-between items-center mb-4 p-4 bg-white shadow rounded-lg">
                            <span className="font-medium text-gray-700">{item.name} - {item.price}/-</span>
                            {renderAddButton(item)}
                        </li>
                    ))}
                </ul>

                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Women's Items</h2>
                <ul className="mb-8">
                    {womensItems.map((item, index) => (
                        <li key={index} className="flex justify-between items-center mb-4 p-4 bg-white shadow rounded-lg">
                            <span className="font-medium text-gray-700">{item.name} - {item.price}/-</span>
                            {renderAddButton(item)}
                        </li>
                    ))}
                </ul>

                {/* Kids Section */}
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">Kids' Items</h2>
                <p className="mb-6 text-gray-500">Coming soon...</p>
            </div>

            {/* Right Section - Bag Summary */}
            <div className="your-bag bg-white p-6 rounded-lg shadow-lg w-full md:w-1/3">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Your Bag</h2>
                {bag.length > 0 ? (
                    <>
                        <ul className="mb-4">
                            {bag.map((item, index) => (
                                <li key={index} className="flex justify-between py-2 border-b">
                                    <span>{item.name}(x{item.quantity})</span>
                                    <span>{item.price * item.quantity}/-</span>
                                </li>
                            ))}
                        </ul>
                        <hr className="my-4" />
                        <p className="font-semibold text-gray-700">Subtotal: {subtotal}/-</p>
                        <p className="font-semibold text-gray-700">Delivery Charge: {DeliveryCharge}/-</p>
                        <h3 className="text-lg font-bold text-gray-900">Grand Total: {grandTotal}/-</h3>
                        <div className="mt-6">
                            <button
                                onClick={handleProceedToCheckout}
                                className="w-full px-4 py-2 bg-cadetblue text-white rounded hover:bg-cadetdark transition-colors"
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </>
                ) : (
                    <p className="text-gray-500">Your bag is empty.</p>
                )}
                <button
                    onClick={() => navigate("/services")}
                    className="mt-6 w-full px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                >
                    Back to Services
                </button>
            </div>
        </div>
    );
};

export default IronAndFoldDetails;
