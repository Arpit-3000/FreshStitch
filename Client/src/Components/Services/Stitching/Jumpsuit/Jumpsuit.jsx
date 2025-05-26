import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EmptyBag from "../../EmptyBag.png";
import jumpsuitBg from './jumpsuit.png';

const Jumpsuit = () => {
    const [jumpsuitDesigns, setjumpsuitDesigns] = useState([]);
    const [bag, setBag] = useState({
        items: [],
        subtotal: 0,
        deliveryCharge: 10,
        total: 10
    });

    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
        
        const savedBag = localStorage.getItem("bag_jumpsuit");
        if (savedBag) {
            setBag(JSON.parse(savedBag));
        }
    
        const fetchJumpsuits = async () => {
            try {
                const response = await  fetch(`${import.meta.env.VITE_API_URL}/api/jumpsuitDesigns`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setjumpsuitDesigns(data);
            } catch (error) {
                console.error("Error fetching jumpsuit designs:", error);
            }
        };
    
        fetchJumpsuits();
    }, []);

    useEffect(() => {
        localStorage.setItem("bag_jumpsuit", JSON.stringify(bag));
    }, [bag]);

    const handleProceedToCheckout = () => {
        navigate('/stitching');
    };

    const addItem = (item) => {
        const existingItem = bag.items.find((bagItem) => bagItem.name === item.name);
        let updatedItems;
        if (existingItem) {
            updatedItems = bag.items.map((bagItem) =>
                bagItem.name === item.name ? { ...bagItem, quantity: bagItem.quantity + 1 } : bagItem
            );
        } else {
            updatedItems = [...bag.items, { ...item, quantity: 1 }];
        }

        const updatedSubtotal = bag.subtotal + item.price;
        const updatedTotal = updatedSubtotal + bag.deliveryCharge;

        setBag({
            ...bag,
            items: updatedItems,
            subtotal: updatedSubtotal,
            total: updatedTotal,
        });
    };

    const removeItem = (item) => {
        const existingItem = bag.items.find((bagItem) => bagItem.name === item.name);
        if (!existingItem) return;

        let updatedItems;
        if (existingItem.quantity > 1) {
            updatedItems = bag.items.map((bagItem) =>
                bagItem.name === item.name ? { ...bagItem, quantity: bagItem.quantity - 1 } : bagItem
            );
        } else {
            updatedItems = bag.items.filter((bagItem) => bagItem.name !== item.name);
        }

        const updatedSubtotal = bag.subtotal - item.price;
        const updatedTotal = updatedSubtotal + bag.deliveryCharge;

        setBag({
            ...bag,
            items: updatedItems,
            subtotal: updatedSubtotal,
            total: updatedTotal,
        });
    };

    const handleCameraClick = () => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                const video = document.createElement("video");
                video.srcObject = stream;
                video.play();

                const canvas = document.createElement("canvas");
                const context = canvas.getContext("2d");

                setTimeout(() => {
                    context.drawImage(video, 0, 0, canvas.width, canvas.height);
                    const imageUrl = canvas.toDataURL("image/png");
                    console.log("Captured Image:", imageUrl); // Handle image upload or preview
                    stream.getTracks().forEach(track => track.stop());
                }, 2000);
            })
            .catch((error) => console.error("Error accessing camera:", error));
    };

   
    const renderAddButton = (item) => {
        const existingItem = bag.items.find((bagItem) => bagItem.name === item.name);

        return (
            <div className="flex items-center space-x-2 justify-center">
                {existingItem ? (
                    <div className="flex items-center">
                        <button onClick={() => removeItem(item)} className="px-4 py-1 bg-gray-400 text-white rounded-l">-</button>
                        <span className="px-3 py-1 bg-white text-black border-t border-b">{existingItem.quantity}</span>
                        <button onClick={() => addItem(item)} className="px-4 py-1 bg-cadetblue text-white rounded-r">+</button>
                    </div>
                ) : (
                    <button onClick={() => addItem(item)} className=" px-4 py-2 bg-cadetblue text-white rounded hover:bg-cadetdark transition-colors">
                        Add to Bag
                    </button>
                )}
                <button
                    onClick={handleCameraClick}
                    className="ml-4 px-4 py-2 bg-cadetblue text-white rounded hover:bg-cadetdark transition-colors"
                    title="Capture Image"
                >
                    📷
                </button>
            </div>
        );
    };

    return (
        <>
            <div className="bg-creamLight min-h-screen">
                <div
                    className="relative bg-gradient-to-br from-pink-600 to-pink-900 w-full h-96"
                    style={{
                        clipPath:
                            "polygon(0% 0%, 100% 0%, 100% 90%, 95% 100%, 90% 90%, 85% 100%, 80% 90%, 75% 100%, 70% 90%, 65% 100%, 60% 90%, 55% 100%, 50% 90%, 45% 100%, 40% 90%, 35% 100%, 30% 90%, 25% 100%, 20% 90%, 15% 100%, 10% 90%, 5% 100%, 0% 90%)",
                    }}
                >
                    <img src={jumpsuitBg} className="h-full object-cover" alt="Lehenga Background" />
                    <h1 className="absolute inset-0 flex top-20 left-2/4 text-5xl font-bold text-amber-400 ">Jumpsuit Designs</h1>
                    <h6 className="absolute inset-0 flex top-40 left-2/4 text-2xl font-bold text-amber-400 ">Get your perfect jumpsuit, designed for effortless style.</h6>
                </div>
                <div className="container  mx-20 mr-2 py-4 mt-10">

                    <div className="flex gap-6 ">
                        <div className="space-y-6">
                            {jumpsuitDesigns.map((lehenga, index) => (
                                <div key={index} className="flex items-center border border-gray-300 rounded-lg p-4 bg-white shadow-md">
                                    <img src={lehenga.image} alt={lehenga.name} className="w-52 h-52 object-cover rounded-md mr-6" />
                                    <div className="flex-1 text-left">
                                        <h2 className="text-xl font-semibold mb-2">{lehenga.name}</h2>
                                        <p className="text-gray-600 text-sm">{lehenga.description}</p>
                                        <p className="text-lg font-semibold mt-2">₹{lehenga.price}</p>
                                        <div className="flex items-center mt-2">
                                            {renderAddButton(lehenga)}

                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="bg-white shadow rounded-lg p-4 w-3/6 ">
                            <h2 className="text-xl font-bold text-cadetdark">Your Bag</h2>
                            {bag.items.length > 0 ? (
                                <>
                                    <ul>
                                        {bag.items.map((bagItem, index) => (
                                            <li key={index} className="flex justify-between items-center border-b-2 border-gray-200 py-2">
                                                <span>{bagItem.name}</span>
                                                <span>{bagItem.quantity} x ₹{bagItem.price} = ₹{bagItem.quantity * bagItem.price}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="mt-8">
                                        <div className="flex justify-between">
                                            <span>Sub Total</span>
                                            <span>{bag.subtotal}/-</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Delivery Charge</span>
                                            <span>{bag.deliveryCharge}/-</span>
                                        </div>
                                        <div className="flex justify-between font-bold">
                                            <span>Grand Total</span>
                                            <span>{bag.total}/-</span>
                                        </div>
                                    </div>

                                    <div className="mt-6">
                                        <button
                                            onClick={handleProceedToCheckout}
                                            className="px-4 py-2 w-60 bg-cadetblue text-white rounded hover:bg-cadetdark transition-colors"
                                        >
                                            Proceed to Checkout
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="flex flex-col items-center justify-center">
                                    <p className="text-gray-900 text-2xl mt-14 pb-3 font-semibold">Empty!</p>
                                    <img src={EmptyBag} alt="Empty Bag" className="w-32 h-32" />
                                </div>
                            )}
                            <button
                                onClick={() => navigate("/stitching") }
                                className="px-4 py-2 mt-4 w-60 bg-red-600 text-white rounded hover:bg-red-800 transition-colors"
                            >
                                Stitching section
                            </button>
                        </div>
                    </div>
                </div>
                {/* Contact Section */}
                <footer id="contact" className="bg-gradient-to-br from-cadetblue to-cadetdark text-white p-8 h-72">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="font-bold text-lg"><a href="./contact">Contact Us</a></h3>
                            <p>Fresh Stitch Service</p>
                            <p>Email: FreshStitch.1010@gmail.com</p>
                            <p>Phone: +91 790-5739-950</p>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">Follow Us</h3>
                            <div className="flex space-x-4">
                                <a href="https://www.facebook.com/" target="_blank" className="hover:text-yellow-400">Facebook</a>
                                <a href="https://www.twitter.com" target="_blank" className="hover:text-yellow-400">Twitter</a>
                                <a href="https://www.instagram.com" target="_blank" className="hover:text-yellow-400">Instagram</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
};

export default Jumpsuit;
