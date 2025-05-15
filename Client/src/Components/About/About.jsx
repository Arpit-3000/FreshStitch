import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import bgAbout from './bgAbout.png';
import { useEffect } from 'react';

const AboutUs = () => {
  useEffect(() => {
          window.scrollTo(0, 0); 
        }, []);
  return (<> 
   <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${bgAbout})`, 
      }}
    >
    <section id="about" className="bg-gray-50 py-16 px-4 bg-opacity-70">
      <div className="container mx-auto max-w-7xl text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-8">About Us</h2>
        <p className="text-lg text-gray-900 leading-relaxed mb-12">
          At Laundry Wallah, we are dedicated to providing you with top-notch laundry and tailoring services. 
          Whether you need washing, dry cleaning, or tailoring, we make it easy to book services online, 
          ensuring convenience and high-quality care for your clothes. Our expert team handles each garment with 
          the utmost care, offering a seamless experience from pickup to delivery.
        </p>

        {/* Key Points Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AboutCard 
            title="Convenient Online Booking"
            description="Easily schedule laundry or tailoring services at your convenience with just a few clicks."
            icon={<FaCheckCircle className="text-cadetblue text-3xl" />}
          />
          <AboutCard 
            title="Expert Tailoring"
            description="Our skilled tailors offer personalized stitching, alterations, and fitting services for all garments."
            icon={<FaCheckCircle className="text-cadetblue text-3xl" />}
          />
          <AboutCard 
            title="Eco-Friendly Solutions"
            description="We use environmentally friendly cleaning methods to protect both your clothes and the planet."
            icon={<FaCheckCircle className="text-cadetblue text-3xl" />}
          />
          <AboutCard 
            title="Quick Turnaround"
            description="Fast and reliable service ensures your clothes are back to you, fresh and clean, in no time."
            icon={<FaCheckCircle className="text-cadetblue text-3xl" />}
          />
          <AboutCard 
            title="High-Quality Care"
            description="Our team treats every garment with care, offering a professional finish and attention to detail."
            icon={<FaCheckCircle className="text-cadetblue text-3xl" />}
          />
          <AboutCard 
            title="Affordable Pricing"
            description="We provide competitive pricing for all services without compromising on quality."
            icon={<FaCheckCircle className="text-cadetblue text-3xl" />}
          />
          {/* Additional key points */}
          <AboutCard 
            title="Customizable Plans"
            description="Choose from a range of tailored service plans to match your specific needs and budget."
            icon={<FaCheckCircle className="text-cadetblue text-3xl" />}
          />
          <AboutCard 
            title="Trusted by Customers"
            description="Our long-standing reputation for excellence has earned us the trust of numerous satisfied customers."
            icon={<FaCheckCircle className="text-cadetblue text-3xl" />}
          />
          <AboutCard 
            title="Seamless Pickup and Delivery"
            description="Enjoy hassle-free pickup and delivery at your doorstep, saving you time and effort."
            icon={<FaCheckCircle className="text-cadetblue text-3xl" />}
          />
          <AboutCard 
            title="Personalized Garment Care"
            description="We treat each item individually, providing special care for delicate fabrics and special garments."
            icon={<FaCheckCircle className="text-cadetblue text-3xl" />}
          />
          <AboutCard 
            title="Regular Updates and Tracking"
            description="Stay informed with real-time updates on your order status from pickup to delivery."
            icon={<FaCheckCircle className="text-cadetblue text-3xl" />}
          />
          <AboutCard 
            title="Satisfaction Guaranteed"
            description="We stand behind our work with a satisfaction guarantee for every service we provide."
            icon={<FaCheckCircle className="text-cadetblue text-3xl" />}
          />
        </div>
      </div>
    </section>
    </div>
    <footer id="contact" className="bg-gradient-to-br from-cadetblue to-cadetdark text-white p-8 mt-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-bold text-lg text-black"  onClick={() => navigate(Contact)} >Contact Us</h3>
            <p>Laundry Wallah Service</p>
            <p>Email: LaundryWallah.1010@gmail.com</p>
            <p>Phone: +91 790-5739-950</p>
          </div>
          <div>
            <h3 className="font-bold text-lg text-black">Follow Us</h3>
            <div className="flex space-x-4">
            <a href="https://www.facebook.com/" target="blank" className="hover:text-yellow-400">Facebook</a>
              <a href="https://www.twitter.com" target="blank" className="hover:text-yellow-400">Twitter</a>
              <a href="https://www.instagram.com" target="blank" className="hover:text-yellow-400">Instagram</a>
            </div>
          </div>
        </div>
      </footer>
      </>
    
  );
};

// Component for each card in the About Us section
const AboutCard = ({ title, description, icon }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default AboutUs;
