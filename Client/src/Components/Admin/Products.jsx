import React, { useState } from "react";
import Sidebar from "./Sidebar";
import MenWearPopup from "./MenWearPopup";
import WomensWearPopup from "./WomensWearPopup";
import HouseholdPopup from "./HouseholdPopup";

const services = [
  "Wash & Iron",
  "Wash & Fold",
  "Iron & Fold",
  "Dry Cleaning",
  "Emergency",
];

const categories = ["Men's Wear", "Women's Wear", "Household"];

const Products = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleButtonClick = (service, category) => {

      setSelectedService(service);
      setSelectedCategory(category);
      setShowPopup(true);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 max-w-7xl mx-auto p-8">
        {/* Header */}
        <h1 className="text-4xl font-bold flex items-center">
          All Products
          <span className="bg-blue-500 text-white text-sm px-3 py-1 ml-4 rounded-full">
            {services.length}
          </span>
        </h1>

        <div className="grid grid-cols-1 gap-8 mt-8">
          {/* Categories Section */}
          <div>
            <h2 className="text-2xl font-serif font-semibold mb-4">Services</h2>
            <div className="space-y-6">
              {services.map((service, index) => (
                <div key={index}>
                  <h3 className="text-xl font-bold font-serif text-gray-800 mb-2">
                    {service}
                  </h3>
                  <div className="grid grid-cols-3 gap-6">
                    {categories.map((category, catIndex) => (
                      <button
                        key={catIndex}
                        className={`py-4 px-6 rounded-lg shadow-lg text-black font-semibold transition-transform font-serif transform hover:scale-105
                          ${
                            catIndex === 0
                              ? "bg-gradient-to-r from-cream1 to-creamDark"
                              : catIndex === 1
                              ? "bg-gradient-to-r from-cadetdark to-cadetblue"
                              : "bg-gradient-to-r from-cream1 to-creamDark"
                          }`}
                        onClick={() => handleButtonClick(service, category)}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              {services.length === 0 && (
                <p className="text-gray-500">No services available</p>
              )}
            </div>
          </div>
        </div>
      </div>



      {/*Men's Popup*/}
      {showPopup && selectedCategory==="Men's Wear" &&(
        <MenWearPopup
          service={selectedService}
          category="Men's Wear"
          onClose={() => setShowPopup(false)}
        />
      )}

        {/* Women's Popup*/}

      {showPopup && selectedCategory==="Women's Wear" &&(
        <WomensWearPopup
          service={selectedService}
          category="Women's Wear"
          onClose={() => setShowPopup(false)}
        />
      )}

      {/* Household Popup */}
      {showPopup && selectedCategory==="Household" &&(
        <HouseholdPopup
          service={selectedService}
          category="Household"
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
};

export default Products;
