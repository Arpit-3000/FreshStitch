import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
import google from "./sign-in-google.png";
import facebook from "./sign-in-fb.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth, provider, signInWithPopup } from "../../../firebase";


function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // Handle input changes
    const handleOnChangeUsername = (event) => setUsername(event.target.value);
    const handleOnChangePassword = (event) => setPassword(event.target.value);

    // Normal Username/Password Login
    const handleLogin = async (event) => {
        event.preventDefault();

        if (!username || !password) {
            toast.error("Please enter your credentials");
            return;
        }

        try {
            const response = await  fetch(`${import.meta.env.VITE_API_URL}/api/login/auth/google`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("token", data.token);
                toast.success("You are logged in successfully!");
                navigate("/");
            } else {
                toast.error("Invalid username or password");
            }
        } catch (error) {
            toast.error("Server error, please try again later");
        }
    };




    // 🔹 Listen for auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                navigate("/");  // Redirect if already signed in
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe(); // Cleanup listener on unmount
    }, [navigate]);

    // 🔹 Google Sign-In
    const handleGoogleLogin = async () => {
        try {
            await signOut(auth); // Sign out first
            provider.setCustomParameters({ prompt: "select_account" });
    
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
    
            const response = await  fetch(`${import.meta.env.VITE_API_URL}/api/login/auth/google`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: user.uid,
                    username: user.displayName,
                    email: user.email,
                }),
            });
    
            if (response.ok) {
                const data = await response.json();
              
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
              
                toast.success(`Welcome ${data.user.name}`, {
                  position: "bottom-center",
                  autoClose: 2000,
                });
              
                // Delay navigation until after toast
                setTimeout(() => {
                  navigate("/");
                }, 2000);
              } else {
                toast.error("Authentication failed");
              }
    
        } catch (error) {
            toast.error("Google Sign-in failed");
            console.error("Google Sign-in error:", error);
        }
    };
    
    return (
        <div className="mainn">
           
            <div className="register-page">
                <p className="tagline">
                    Your Laundry, Our Priority!
                    <div className="register-title">
                        <p>New here?</p>
                        <p className="welcome-msg">
                            Welcome to Laundry-Wallah! From crisp, clean laundry to perfectly tailored outfits, we’ve got all your wardrobe needs covered.
                        </p>
                        <button className="Sign-up-btn" onClick={() => navigate("/RegisterPage")}>
                            Sign Up
                        </button>
                    </div>
                </p>
            </div>
            <div className="form-container">
                <form className="form-page" onSubmit={handleLogin}>
                    <p className="Sign-in-heading">Sign in</p>
                    <input type="email" placeholder="Email" value={username} onChange={handleOnChangeUsername} />
                    <br />
                    <input type="password" placeholder="Password" value={password} onChange={handleOnChangePassword} />
                    <br />
                    <button type="submit" className="sign-in-btn">Sign in</button>
                    <p className="password-forgot">Forgot your password?</p>
                    <br />
                    <div className="sign-in-other-option">
                        <button type="button" onClick={handleGoogleLogin} className="google-sign-in-btn">
                            <img src={google} alt="Google" />
                        </button>
                        <img src={facebook} className="facebook-sign-in" alt="Facebook" />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;
