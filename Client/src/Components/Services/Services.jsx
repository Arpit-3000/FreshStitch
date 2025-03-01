import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useEffect } from 'react';
import './Services.css';
import { motion } from 'framer-motion';
import wash_iron from './wash_iron.png';
import wash_fold from './wash_fold.png';
import iron_fold from './iron_fold.png';
import dry_cleaning from './dry_cleaning.png';
import emergency from './emergency.png';
import alteration from './alteration.png';
import sewing from './sewing.png';
import stitching from './stitching.png';
import fitting from './fitting.png';
import combo from './combo.png';
import backgroundImage from './back.jpg';

// Separate arrays for Laundry and Tailoring services
const laundryServices = [
  {
    title: "Wash and Iron",
    description: "Professional washing and ironing for a crisp finish.",
    imgSrc: wash_iron,
    route: "/wash-and-iron"
  },
  {
    title: "Wash and Fold",
    description: "Efficient washing and folding services for your convenience.",
    imgSrc: wash_fold,
    route: "/wash-and-fold"
  },
  {
    title: "Iron and Fold",
    description: "Ironing and folding services for neatly presented clothes.",
    imgSrc: iron_fold,
    route: "/iron-and-fold"
  },
  {
    title: "Dry Cleaning",
    description: "Specialized cleaning for delicate fabrics.",
    imgSrc: dry_cleaning,
    route: "/dry-cleaning"
  },
  {
    title: "Emergency Service",
    description: "Fast-track service for urgent needs.",
    imgSrc: emergency,
    route: "/emergency-service"
  },
  {
    title: "Combo (All-Inclusive)",
    description: "Includes all services at a special price.",
    imgSrc: combo,
    route: "/combo"
  },
];

const tailoringServices = [
  {
    title: "Alteration",
    description: "Expert sewing services for garment repairs.",
    imgSrc: sewing,
    route: "/sewing"
  },
  {
    title: "Stitching",
    description: "Tailoring services for altering your garments.",
    imgSrc: alteration,
    route: "/stitching"
  },

];

const Services = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // localStorage.removeItem("bag");
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight; // Get the Navbar height
        const elementPosition = element.offsetTop; // Get the element's position from the top
        const offsetPosition = elementPosition - navbarHeight; // Adjust for Navbar height
  
        // Scroll without a smooth animation
        window.scrollTo({
          top: offsetPosition,
          behavior: 'auto',
        });
      }
    }
  }, [location]);
  

  const exploreService = (service) => {
    navigate(service.route);
  };

  return (
    <div
      className="services-page min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="bg-white bg-opacity-50 min-h-screen p-8">
        {/* <h1 className="text-4xl font-bold text-center mb-8">Our Services</h1> */}

        {/* Laundry Services Section */}
        <section id="laundry-services" className="mb-16">
          <h2 className="text-3xl font-bold mb-6 pt-11">Laundry Services</h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {laundryServices.map((service, index) => (
              <ServiceCard
                key={index}
                service={service}
                onExplore={() => exploreService(service)}
              />
            ))}
          </motion.div>
        </section>


        {/* Tailoring Services Section */}
        <section id="tailoring-services">
          <h2 className="text-3xl font-bold mb-6 pt-11">Tailoring Services</h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {tailoringServices.map((service, index) => (
              <ServiceCard
                key={index}
                service={service}
                onExplore={() => exploreService(service)}
              />
            ))}
          </motion.div>
        </section>
      </div>

      {/* Footer Section */}
      <footer id="contact" className="bg-gradient-to-br from-cadetblue to-cadetdark text-white p-8 mt-4">
        <div className="flex justify-between items-center">
          <div>
            <h3
              className="font-bold text-lg text-black"
              onClick={() => navigate('/contact')}
            >
              Contact Us
            </h3>
            <p>Laundry Wallah Service</p>
            <p>Email: LaundryWallah.1010@gmail.com</p>
            <p>Phone: +91 790-5739-950</p>
          </div>
          <div>
            <h3 className="font-bold text-lg text-black">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/"
                target="blank"
                className="hover:text-yellow-400"
              >
                Facebook
              </a>
              <a
                href="https://www.twitter.com"
                target="blank"
                className="hover:text-yellow-400"
              >
                Twitter
              </a>
              <a
                href="https://www.instagram.com"
                target="blank"
                className="hover:text-yellow-400"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// ServiceCard Component
const ServiceCard = ({ service, onExplore }) => {
  return (
    <motion.div
      className="max-w-sm bg-cream border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <motion.img
        src={service.imgSrc}
        alt={service.title}
        className="h-80 w-full object-cover mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      />
      <h3 className="text-xl font-bold mb-2">{service.title}</h3>
      <p className="mb-4">{service.description}</p>
      <button
        onClick={onExplore}
        className="mt-2 px-6 py-2 bg-cadetblue text-white rounded hover:bg-cadetdark transition-colors ml-2"
      >
        Explore
      </button>
    </motion.div>
  );
};

export default Services;
