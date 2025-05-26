import { Link, useNavigate, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { deleteUser } from "firebase/auth";
import './NavBar.css';
import account from './account-png.png';
import logo from './Logo.png';
import { toast } from 'react-toastify'; // Import react-toastify
import 'react-toastify/dist/ReactToastify.css';
import { auth } from "../../../firebase";
import { signOut, setPersistence, browserSessionPersistence } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const [showDropdown, setShowDropdown] = useState(false); // Account dropdown visibility
  const [showServicesDropdown, setShowServicesDropdown] = useState(false); // Services dropdown visibility
  const navigate = useNavigate();
  const location = useLocation(); // React Router's location hook

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleAccountDropdownToggle = () => {
    setShowDropdown((prevState) => !prevState); // Toggle account dropdown visibility
  };

  const handleServicesDropdownToggle = () => {
    setShowServicesDropdown((prevState) => !prevState); // Toggle services dropdown visibility
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Current User:", currentUser);
      console.log("Photo URL:", currentUser?.photoURL); // 🔍 Check if this exists
      setUser(currentUser);
      setIsLoggedIn(!!currentUser);
      if (!currentUser) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Provider:", currentUser?.providerData);
      setUser(currentUser);
      setIsLoggedIn(!!currentUser);
    });

    return () => unsubscribe();
  }, []);



  const handleLogout = async () => {
    if (!isLoggedIn || !user) {
      toast.info("You're not logged in!");
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem("user"));
    console.log("User from localStorage:", storedUser);

    // Delay toast slightly to ensure ToastContainer is still mounted
    setTimeout(() => {
      toast.success(`Goodbye ${storedUser?.name || "User"}`);
    }, 1000);

    // Delay signOut to let toast show
    setTimeout(async () => {
      await signOut(auth);
      setIsLoggedIn(false);
      setUser(null);
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      navigate('/');
    }, 1000); // Delay must match Toast autoClose
  };

  // Scroll to section when hash changes
  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight; // Get the Navbar height
        const elementPosition = element.offsetTop; // Get the element's position from the top
        const offsetPosition = elementPosition - navbarHeight; // Adjust for Navbar height

        // Scroll with a smooth animation
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }
  }, [location]);




  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo flex">
          <Link to="/">
            <img src={logo} alt="Logo" style={{ display: 'block' }} />
          </Link>
          <Link to="/" className=' font-serif' onClick={() => { setIsOpen(false) }} >Fresh Stitch</Link>
        </div>

        <div className={`navbar-links ${isOpen ? 'open' : ''}`} >
          <Link to="/" className=' font-serif' onClick={() => { setIsOpen(false) }}>Home</Link>

          {/* Services Dropdown Button */}
          <div className="services-section">
            <button
              className="services-button font-serif"
              onClick={handleServicesDropdownToggle} // Toggle dropdown on click
            >
              Services
            </button>
            {showServicesDropdown && (
              <div className="services-dropdown-menu rounded-xl">
                <Link
                  to="/services#laundry-services"
                  className="dropdown-item font-serif font-light"
                  onClick={() => {
                    setShowServicesDropdown(false);
                    setIsOpen(false);  // <-- Add this line
                  }}
                >
                  Laundry Services
                </Link>
                <Link
                  to="/services#tailoring-services"
                  className="dropdown-item font-serif font-light"
                  onClick={() => {
                    setShowServicesDropdown(false);
                    setIsOpen(false);  // <-- Add this line
                  }}
                >
                  Tailoring Services
                </Link>
              </div>
            )}
          </div>
          <Link to="/about" className=' font-serif' onClick={()=>{setIsOpen(false)}}>About</Link>
          <Link to="/contact" className=' font-serif'  onClick={()=>{setIsOpen(false)}}>Contact</Link>

          <div className="account-section">
            <img
              src={user && user.photoURL ? user.photoURL : account}
              alt="Account"
              className="account-icon rounded-full"
              onClick={handleAccountDropdownToggle}
            />

            {showDropdown && (
              <div className="dropdown-menu rounded-xl">
                {isLoggedIn ? (
                  <>
                    {/* <Link to="/profile" className="dropdown-item font-serif  " onClick={() => { setShowDropdown(false) }} >My Profile</Link> */}
                    <Link to="/my-orders" className='dropdown-item font-serif' onClick={() => {
                      setShowDropdown(false);
                      setIsOpen(false);  // <-- Add this line
                    }}>Track Orders</Link>
                    <button className="logout-btn dropdown-item font-serif w-full" onClick={handleLogout}>Logout</button>
                  </>
                ) : (
                  <>
                    <Link to="/LoginPage" className="dropdown-item font-serif" onClick={() => {
                      setShowDropdown(false);
                      setIsOpen(false);  // <-- Add this line
                    }}>Login</Link>
                    <Link to="/RegisterPage" className="dropdown-item font-serif" onClick={() => setShowDropdown(false)}>Sign Up</Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="navbar-toggle" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </nav>

    </>
  );
};

export default Navbar;
