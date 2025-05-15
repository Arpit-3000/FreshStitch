import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const HouseholdPopup = ({ onClose }) => {
    const [products, setProducts] = useState([]);
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [editingProduct, setEditingProduct] = useState(null);

    // Fetch household products from API
    useEffect(() => {
         fetch(`${import.meta.env.VITE_API_URL}/api/household`)
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((err) => console.error("Error fetching data:", err));
    }, []);

    // Add new product
    const handleAddProduct = async () => {
        if (!productName || !productPrice) {
            alert("Please enter product name and price!");
            return;
        }

        const newProduct = { name: productName, price: Number(productPrice) };

        const response = await  fetch(`${import.meta.env.VITE_API_URL}/api/household`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newProduct),
        });

        if (response.ok) {
            const updatedProducts = await response.json();
            setProducts(updatedProducts); 
            setProductName("");
            setProductPrice("");
        }
    };

    // Delete product
    const handleDeleteProduct = async (id) => {
        try {
            const response = await  fetch(`${import.meta.env.VITE_API_URL}/api/household/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete the product");
            }

            setProducts((prevProducts) => prevProducts.filter((item) => item._id !== id));
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    
    const startEditing = (product) => {
        setEditingProduct(product._id);
        setProductName(product.name);
        setProductPrice(product.price);
    };

    
    const handleEditProduct = async () => {
        if (!productName || !productPrice || !editingProduct) {
            alert("Please enter product name and price!");
            return;
        }

        const updatedProduct = { name: productName, price: Number(productPrice) };

        try {
            const response = await  fetch(`${import.meta.env.VITE_API_URL}/api/household/${editingProduct}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedProduct),
            });

            if (!response.ok) {
                throw new Error("Failed to update product");
            }

            
            setProducts((prevProducts) =>
                prevProducts.map((item) =>
                    item._id === editingProduct ? { ...item, ...updatedProduct } : item
                )
            );

            setEditingProduct(null); 
            setProductName("");
            setProductPrice("");
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[80%] max-w-5xl relative">
                {/* Close Button */}
                <button className="absolute top-2 right-2 text-gray-600 hover:text-red-600 text-2xl" onClick={onClose}>
                    ✖
                </button>

                {/* Header */}
                <h2 className="text-2xl font-semibold font-serif text-center text-cadetblue mb-4">
                    Household Products
                </h2>

                {/* Input Fields */}
                <div className="flex items-center gap-3 mb-4">
                    <input
                        type="textt"
                        placeholder="Product Name"
                        className="border p-2 rounded w-full focus:outline-blue-500"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Price"
                        className="border p-2 rounded w-32 focus:outline-blue-500"
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)}
                    />
                    {editingProduct ? (
                        <button
                            className="bg-cadetblue hover:bg-cadetdark w-44 text-white px-4 py-2 rounded font-semibold font-serif"
                            onClick={handleEditProduct}
                        >
                            Update
                        </button>
                    ) : (
                        <button
                            className="bg-cadetblue hover:bg-cadetdark w-44 text-white px-4 py-2 rounded font-semibold font-serif"
                            onClick={handleAddProduct}
                        >
                            + Add
                        </button>
                    )}
                </div>

                {/* Table of Products */}
                <div className="overflow-y-auto max-h-80">
                    <table className="w-full border-collapse text-sm">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="text-left font-bold p-2">#</th>
                                <th className="text-left font-bold p-2">Product Name</th>
                                <th className="text-left font-bold p-2">Price</th>
                                <th className="text-center p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => (
                                <tr key={product._id || index} className="border-b">
                                    <td className="p-2">{index + 1}</td>
                                    <td className="p-2">{product.name}</td>
                                    <td className="p-2">₹ {product.price}</td>
                                    <td className="p-2 flex justify-center gap-2">
                                        <button
                                            className="bg-yellow-500 hover:bg-yellow-700 text-white px-2 py-1 rounded"
                                            onClick={() => startEditing(product)}
                                        >
                                            <FontAwesomeIcon icon={faEdit} />
                                        </button>
                                        <button
                                            className="bg-red-700 hover:bg-red-900 text-white px-2 py-1 rounded"
                                            onClick={() => handleDeleteProduct(product._id)}
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* No Data Message */}
                {products.length === 0 && <p className="text-gray-500 text-center mt-4">No products available</p>}
            </div>
        </div>
    );
};

export default HouseholdPopup;
