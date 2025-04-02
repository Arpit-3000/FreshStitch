import React, { useState } from "react";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
import google from "./sign-in-google.png";
import facebook from "./sign-in-fb.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth, provider, signInWithPopup } from "../../../firebase";

function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
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
            const response = await fetch("http://localhost:3000/login", {
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

    // ✅ Google Sign-In (Updated)
    const handleGoogleLogin = async () => {
        try {
            // ✅ Ensure the user is signed out first to force the account selection prompt
            await auth.signOut();
    
            // ✅ Configure Google provider to always show the account selection popup
            provider.setCustomParameters({ prompt: "select_account" });
    
            // ✅ Now sign in with Google
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
    
            // ✅ Send Google user details to backend
            const response = await fetch("http://localhost:3000/auth/google", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: user.uid,  // Store Firebase user ID
                    username: user.displayName,
                    email: user.email,
                }),
            });
    
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify({ id: user.uid, name: user.displayName, email: user.email }));
    
                toast.success(`Welcome ${user.displayName}!`);
                navigate("/");
                window.location.reload(); // Ensure state updates everywhere
            } else {
                toast.error("Google authentication failed");
            }
        } catch (error) {
            toast.error("Google Sign-in failed");
        }
    };
    
    return (
        <div className="mainn">
            <ToastContainer />
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
