import React, { useState, useEffect, useContext } from "react";
import { auth } from "../../firebase";
import { signOut, updateEmail, updatePassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import { UserContext } from "../context/UserContext"; // Import your user context

const Profile = () => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [profile, setProfile] = useState({
        username: "",
        email: "",
        uid: "",
    });

    useEffect(() => {
        if (user) {
            setProfile({
                username: user.displayName || "",
                email: user.email || "",
                uid: user.uid,
            });

            // Fetch user details from backend
            fetch(`http://localhost:3000/profile/${user.uid}`)
                .then((res) => res.json())
                .then((data) => {
                    if (data) {
                        setProfile((prev) => ({
                            ...prev,
                            username: data.username || prev.username,
                            email: data.email || prev.email,
                        }));
                    }
                })
                .catch((err) => console.error("Error fetching profile:", err));
        }
    }, [user]);

    const handleUpdateProfile = async () => {
        try {
            await fetch("http://localhost:3000/profile/update", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    uid: user.uid,
                    username: profile.username,
                    email: profile.email,
                }),
            });

            toast.success("Profile updated successfully!");
        } catch (error) {
            toast.error("Failed to update profile.");
            console.error("Profile Update Error:", error);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setUser(null);
            localStorage.removeItem("token");
            navigate("/login");
            toast.success("Logged out successfully!");
        } catch (error) {
            toast.error("Logout failed");
            console.error("Logout Error:", error);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Profile</h2>

            <label className="block mb-2">Username:</label>
            <input
                type="text"
                className="border p-2 w-full"
                value={profile.username}
                onChange={(e) => setProfile({ ...profile, username: e.target.value })}
            />

            <label className="block mt-4 mb-2">Email:</label>
            <input
                type="email"
                className="border p-2 w-full"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            />

            <button onClick={handleUpdateProfile} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
                Update Profile
            </button>

            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded mt-4 ml-4">
                Logout
            </button>
        </div>
    );
};

export default Profile;
