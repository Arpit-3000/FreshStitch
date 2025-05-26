
import { Carousel } from "react-responsive-carousel";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import file2 from './file2.jpg';
import file3 from './file3.png';
import dry_cleaning from './dry_cleaning.png';
import washfold from './wash_fold.png';
import ironfold from './iron_fold.png';
import washiron from './wash_iron.png';
import alteration from './alteration.png';
import { FaCheckCircle } from 'react-icons/fa';
import placeorder from './placeorder.png';
import pickup from './pickup.png';
import deliver from './deliver.png';
import affordprice from './affordprice.png';
import qualitycare from './qualitycare.png';
import fastdelivery from './fastdelivery.png';
import stitching from './stitching.png';


const Home = () => {
  const scrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when this page loads
  }, []);

  const navigate = useNavigate();


  return (
    <div className="home">

      <nav className="sticky top-0 z-50 bg-cadetblue p-4 shadow-lg">
        <ul className="flex space-x-4 overflow-x-auto whitespace-nowrap text-white">
          <li>
            <button onClick={() => scrollToSection("services")} className="hover:text-yellow-400">
              Services
            </button>
          </li>
          <li>
            <button onClick={() => scrollToSection("about")} className="hover:text-yellow-400">
              About Us
            </button>
          </li>
          <li>
            <button onClick={() => scrollToSection("contact")} className="hover:text-yellow-400">
              Contact
            </button>
          </li>
        </ul>
      </nav>

      {/* Carousel */}
      <div className="carousel-container mt-1">
        <Carousel showThumbs={false} autoPlay infiniteLoop>
          <div>
            <img
              src={file3}
              className="carousel"
              alt="Laundry Service"
              style={{ width: '100%', height: 'auto', maxHeight: '700px' }}
            />
            <div
              className="absolute flex-col space-y-5 top-10 left-4 sm:top-20 sm:left-10 md:left-20 lg:left-40 h-auto w-11/12 sm:w-3/4 lg:w-96 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.0)' }} // optional for visibility
            >

              <div className="text-black font-medium text-3xl md:text-5xl lg:text-6xl pb-2 md:pb-4 font-serif">
                Welcome to
              </div>
              <div className="text-black text-xl md:text-2xl lg:text-3xl font-serif pb-2 md:pb-4">
                Fresh Stitch <br></br> Perfect place for Dhulai
              </div>
              <button className="border-black hover:bg-sky-950 font-sans rounded-sm h-10 w-24 md:h-10 md:w-28 text-white font-semibold bg-sky-800">
                <Link to="/about">View More</Link>
              </button>
            </div>
            {/* <p className="legend">Fresh Stitch</p> */}
          </div>

          <div
            className="relative"
            style={{ maxHeight: '700px' }}
          >
            <img
              src={file2}
              alt="Tailoring Service"
              style={{ width: '100%', height: 'auto', maxHeight: '700px' }}
            />

            <div
              className="
    absolute flex flex-col
    top-10 right-4
    sm:top-20 sm:right-10
    md:right-20 md:top-32
    lg:right-40 lg:top-40
    h-auto
    w-11/12
    sm:w-3/4
    lg:w-96
    max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg
    bg-transparent
    items-center
  "
            >
              <div className="text-black font-medium text-3xl md:text-5xl lg:text-6xl pb-2 md:pb-4 font-serif text-center">
                Welcome to
              </div>

              <div className="text-black text-xl md:text-2xl lg:text-3xl font-serif pb-2 md:pb-4 text-center">
                Fresh Stitch <br /> Perfect place for Silai
              </div>

              <button className="border-black hover:bg-sky-950 font-sans rounded-sm h-10 w-24 md:h-10 md:w-28 text-white font-semibold bg-sky-800">
                <Link to="/about">View More</Link>
              </button>
            </div>
          </div>

        </Carousel>
      </div>


      {/* About Section */}
      <section id="about" className="bg-gray-50 py-16 px-4">
        <div className="container mx-auto max-w-7xl text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">About Us</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-12">
            At Fresh Stitch, we are dedicated to providing you with top-notch laundry and tailoring services.
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
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="p-8 bg-gray-200">
        <h2 className="text-3xl font-bold text-center mb-8">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <ServiceCard
            title="Washing"
            description="Professional washing services for your clothes."
            imgSrc={washfold}
            link="/wash-and-fold"
          />
          <ServiceCard
            title="Dry Cleaning"
            description="Delicate and effective dry cleaning."
            imgSrc={dry_cleaning}
            link="/dry-cleaning"
          />
          <ServiceCard
            title="Ironing"
            description="Get a crisp, professional finish with our ironing service."
            imgSrc={ironfold}
            link="/iron-and-fold"
          />
          <ServiceCard
            title="Laundry Combo"
            description="Washing and ironing combo at a special price."
            imgSrc={washiron}
            link="/wash-and-iron"
          />
          <ServiceCard
            title="Tailoring"
            description="Expert tailoring services for all garments."
            imgSrc={stitching}
            link="/stitching"
          />
          <ServiceCard
            title="Alterations"
            description="Quick and precise alterations to fit you perfectly."
            imgSrc={alteration}
            link="/stitching"
          />
        </div>
      </section>

      {/*How it works Section*/}
      <div className="mt-16">
        <h2 className="text-3xl font-semibold text-center mb-8">How It Works?</h2>
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FlowChartStep
              step="1"
              title="Place Order"
              description="Select services like washing, dry cleaning, ironing, or tailoring and book online."
              imgSrc={placeorder} />
            <FlowChartStep
              step="2"
              title="Pick Up"
              description="Our team collects your clothes from your doorstep at your convenience."
              imgSrc={pickup} />
            <FlowChartStep
              step="3"
              title="Clean & Deliver"
              description="We clean, press, and deliver your clothes back, making them look fresh and new."
              imgSrc={deliver} />
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="mt-12  pt-5 pb-10 mb-0  bg-gray-200">
        <h2 className="text-3xl font-semibold text-center mb-8">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ml-10">
          <WhyChooseUsCard title="Affordable Pricing"
            description="We offer competitive prices without compromising on quality."
            imgSrc={affordprice} />
          <WhyChooseUsCard
            title="High-Quality Care"
            description="Our team ensures that every garment receives premium care."
            imgSrc={qualitycare} />
          <WhyChooseUsCard
            title="Fast Turnaround"
            description="Get your clothes cleaned and delivered quickly without hassle."
            imgSrc={fastdelivery} />
        </div>
      </div>

      {/* Contact Section */}
      <footer id="contact" className="bg-gradient-to-br from-cadetblue to-cadetdark text-white p-8 ">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-bold text-lg text-black"><a href="./contact">Contact Us</a> </h3>
            <p>Fresh Stitch Service</p>
            <p>Email:FreshStitch.1010@gmail.com</p>
            <p>Phone: +91 790-5739-950</p>
          </div>
          <div>
            <h4 onClick={() => navigate("/admin-login")} className="font-bold text-lg text-black cursor-pointer underline">
              Admin Panel
            </h4>
            <h3 className="font-bold text-lg text-black">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/" target="blank" className="hover:text-yellow-400">Facebook</a>
              <a href="https://www.twitter.com" target="blank" className="hover:text-yellow-400">Twitter</a>
              <a href="https://www.instagram.com" target="blank" className="hover:text-yellow-400">Instagram</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// AboutCard 
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

// ServiceCard 
const ServiceCard = ({ title, description, imgSrc, link }) => {
  const navigate = useNavigate();

  return (
    <div className="max-w-sm bg-cream border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4">
      <img src={imgSrc} alt={title} className="w-full h-80 object-cover" />
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p>{description}</p>
      <button
        className="mt-4 px-4 py-2 bg-cadetblue text-white rounded hover:bg-cadetdark transition-colors"
        onClick={() => navigate(link)}
      >
        Learn More
      </button>
    </div>
  );
};

const FlowChartStep = ({ step, title, description, imgSrc }) => {
  return (
    <div className="text-center bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-2 mr-4 ml-4">
      <h3 className="text-2xl font-bold mb-2">Step {step}: {title}</h3>
      <p>{description}</p>
      <img src={imgSrc} alt={title} className="w-50 h-20 p-4 ml-44  mt-5 object-cover" />
    </div>
  );
};

const WhyChooseUsCard = ({ title, description, imgSrc }) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4">
      <h3 className="text-xl font-bold mb-2 text-center" >{title}</h3>
      <p className="text-center">{description}</p>
      <img src={imgSrc} alt={title} className="w-50 h-20 p-4 ml-36 mt-5 object-cover" />
    </div>
  );
};

export default Home;
