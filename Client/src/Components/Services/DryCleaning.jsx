import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import EmptyBag from "./EmptyBag.png";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "../Loader/Loader";

const DryCleaning = () => {
    const [bag, setBag] = useState({
        items: [],
        // selectedService:"Wash-And-Fold",
        subtotal: 0,
        deliveryCharge: 10,
        total: 10
    });
    const[selectedService,setselectedService]=useState("Dry Cleaning");


   
      
    const [categories, setCategories] = useState([]);
    const [loading,setLoading]=useState(true)
    const navigate = useNavigate();
    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to top when this page loads
      
        // localStorage.removeItem("bag");
       
        const savedBag = localStorage.getItem("bag");
        if (savedBag) {
            setBag(JSON.parse(savedBag)); // Load the bag data from localStorage
        }
        const fetchCategories = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/laundryCategories");
                const data = await response.json();
                setCategories(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching categories:", error);
                setLoading(false);
            }
        };

        fetchCategories();
        return () => {
            localStorage.removeItem("bag");
        };
    }, []);
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        localStorage.setItem("bag", JSON.stringify(bag)); // Save to localStorage whenever bag updates
    }, [bag]);
    console.log(bag);


    const handleProceedToCheckout = () => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate("/cart", {
                state: {
                    bag: bag.items,
                    selectedService: bag.selectedService,
                    subtotal: bag.subtotal,
                    deliveryCharge: bag.deliveryCharge,
                    total: bag.total,
                }
            });
        } else {
            toast.error('Please log in to proceed!', {
                position: 'bottom-center',
                autoClose: 2000,
                hideProgressBar: true,
            });
           
            setTimeout(() => {
                navigate("/LoginPage");
            }, 1000);
             
        }
    };


    const faqs = [
        "What is included in the wash & iron service?",
        "How much time does it take to deliver?",
        "Are there any additional charges for bulky items?",
    ];

    const addItem = (item) => {
        const existingItem = bag.items.find((bagItem) => bagItem.name === item.name);

        let updatedItems;
        if (existingItem) {
            updatedItems = bag.items.map((bagItem) =>
                bagItem.name === item.name
                    ? { ...bagItem, quantity: bagItem.quantity + 1 }
                    : bagItem
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
                bagItem.name === item.name
                    ? { ...bagItem, quantity: bagItem.quantity - 1 }
                    : bagItem
            );
        } else {
            updatedItems = bag.items.filter((bagItem) => bagItem.name !== item.name);
        }

        const updatedSubtotal = bag.subtotal - item.price;
        const updatedTotal = updatedSubtotal + bag.deliveryCharge;

        setBag((prevBag) => ({
            ...prevBag,
            items: updatedItems,
            subtotal: updatedSubtotal,
            total: updatedTotal,
        }));
    };

    const renderAddButton = (item) => {
        const existingItem = bag.items.find((bagItem) => bagItem.name === item.name);

        if (existingItem) {
            return (
                <div className="flex items-center">
                    <button
                        onClick={() => removeItem(item)}
                        className="px-3 py-1 bg-gray-400 text-white rounded-l"
                    >
                        -
                    </button>
                    <span className="px-3 py-1 bg-white text-black border-t border-b">
                        {existingItem.quantity}
                    </span>
                    <button
                        onClick={() => addItem(item)}
                        className="px-3 py-1 bg-cadetblue text-white rounded-r"
                    >
                        +
                    </button>
                </div>
            );
        } else {
            return (
                <button
                    onClick={() => addItem(item)}
                    className="ml-4 px-4 py-2 bg-cadetblue text-white rounded hover:bg-cadetdark transition-colors"
                >
                    Add to Bag
                </button>
            );
        }
    };

    return (
        <>
            <div className="bg-creamLight">
                <div className="container mx-auto p-4">
                    <div className=" relative flex  w-5/5 ">
                        <h1 className="text-4xl font-bold font-serif  text-cadetblue mb-10 mt-6 ">
                            Dry Cleaning Service
                        </h1>
                        <button className="mt-6  px-4 py-2 absolute  right-0 w-48 h-2/4 bg-red-500 text-white rounded hover:bg-red-800 transition-colors" onClick={toggleDropdown}>
                            Select Service <span>▼</span>
                        </button>
                        {isOpen && (
                            <div className="absolute right-0 top-20 mt-2 w-48 bg-white shadow-lg rounded-md">
                                <ul className="py-2">
                                    {[
                                        <Link to="/wash-and-iron">Wash & Iron</Link>,
                                        <Link to="/Iron-and-Fold">Iron & Fold</Link>,
                                        <Link to="/wash-and-Fold">Wash & Fold</Link>,
                                        <Link to="/alteration">Alteration</Link>,
                                        <Link to="/stitching">Stiching</Link>
                                    ].map((service, index) => (
                                        <li
                                            key={index}
                                            className="px-4 py-2 text-red-500 hover:bg-gray-100 cursor-pointer"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {service}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Categories */}
                        
                        {loading ? (
                        <Loader/>
                        ) : categories.length === 0 ? (
                          <p className="text-center text-lg text-gray-500">No Categories Found</p>
                        ) : (
                            <div>
                            {categories.map((category, index) => (
                                <details
                                    key={index}
                                    className="mb-4 border border-gray-300 rounded-lg p-4 bg-white"
                                >
                                    <summary className="flex  justify-between cursor-pointer">
                                        <span className="flex items-center space-x-2">
                                            <span className="text-2xl">{category.icon}</span>
                                            <span className="text-lg font-medium">{category.name}</span>
                                        </span>
                                        <span>▼</span>
                                    </summary>
                                    {category.items.length > 0 ? (
                                        <div className="mt-2 text-gray-600">
                                            {category.items.map((item, itemIndex) => (
                                                <div
                                                    key={itemIndex}
                                                    className="flex justify-between items-center px-6 py-2 border-b"
                                                >
                                                    <span className="flex-1">{item.name}</span>
                                                    <span className="mr-5 text-right font-medium">{item.price}/-</span>
                                                    {renderAddButton(item)}
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-gray-500 mt-2">No items available.</p>
                                    )}
                                </details>
                            ))}
                        </div>
                        )}

                        {/* Bag Section */}
                        <div className="bg-white shadow rounded-lg p-4">
                            <h2 className="text-xl font-bold text-cadetdark">Your Bag</h2>

                            {/* Show Selected Service Name */}
                            {selectedService && (
                                <div className="mt-2 text-lg font-medium text-cadetdark">
                                    Service: <span className="text-cadetblue">{selectedService}</span>
                                </div>
                            )}

                            {bag.items.length > 0 ? (
                                <>
                                    <ul>
                                        {bag.items.map((bagItem, index) => (
                                            <li
                                                key={index}
                                                className="flex justify-between items-center border-b-2 border-gray-200 py-2"
                                            >
                                                <span>{bagItem.name}</span>
                                                <span>
                                                    {bagItem.quantity} x ₹{bagItem.price} = ₹
                                                    {bagItem.quantity * bagItem.price}
                                                </span>
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
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* How to Order */}
                        <section className="mt-12">
                            <h2 className="text-2xl font-bold text-cadetdark">How to Order</h2>
                            <ul className="mt-4 space-y-4">
                                <li>📋 Select service from the available categories.</li>
                                <li>⏰ Set your preferred schedule.</li>
                                <li>🛍️ Place your order!</li>
                            </ul>
                        </section>

                        {/* Details Section */}
                        <section className="mt-12">
                            <h2 className="text-2xl font-bold text-cadetdark">Details of Services</h2>
                            <p className="mt-4 text-gray-600">
                                Laun-Tail helps you find laundry services near you and ensures that
                                your clothes are handled by professionals. Every customer’s laundry
                                is washed with care to preserve their quality. Our services include:
                            </p>
                            <ul className="mt-4 list-disc pl-5 text-gray-600">
                                <li>Trusted, Certified, and Skilled Launderers</li>
                                <li>Best Products and Services</li>
                                <li>Guaranteed Customer Satisfaction</li>
                            </ul>
                        </section>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Terms & Conditions Section */}
                        <section className="mt-12">
                            <h2 className="text-2xl font-bold text-cadetdark">Terms & Conditions</h2>
                            <ul className="mt-4 list-disc pl-5 text-gray-600">
                                <li>
                                    After service completion, you have to pay through online or Cash on
                                    Delivery.
                                </li>
                                <li>
                                    Price may differ due to product fabrication and measurement of
                                    their length.
                                </li>
                                <li>
                                    Service delivery time might extend due to product type or quantity.
                                </li>
                            </ul>
                        </section>

                        {/* FAQ Section */}
                        <section className="mt-12">
                            <h2 className="text-2xl font-bold text-cadetdark">FAQ</h2>
                            <div className="mt-4 space-y-4">
                                {faqs.map((faq, index) => (
                                    <details key={index} className="border p-4 rounded">
                                        <summary>{faq}</summary>
                                        <p className="mt-2 text-gray-600">
                                            Details about "{faq}" will go here.
                                        </p>
                                    </details>
                                ))}
                            </div>
                        </section>
                    </div>

                </div>

                {/* Contact Section */}
                <footer id="contact" className="bg-gradient-to-br from-cadetblue to-cadetdark text-white p-8">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="font-bold text-lg"><a href="./contact">Contact Us</a></h3>
                            <p>Laundry Wallah Service</p>
                            <p>Email: LaundryWallah.1010@gmail.com</p>
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

export default DryCleaning;
