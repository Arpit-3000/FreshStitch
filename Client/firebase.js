import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// ✅ Correct Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrMwL1f6MZt03Ka4l4Y84jp3G9H9hwLec",
  authDomain: "freshstitch-4cbf8.firebaseapp.com",
  projectId: "freshstitch-4cbf8",
  storageBucket: "freshstitch-4cbf8.appspot.com", // ✅ Fixed URL
  messagingSenderId: "986015696343",
  appId: "1:986015696343:web:a6998adcd5cac85553b792",
  measurementId: "G-7YSKP31KML"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// ✅ Initialize Firebase Auth
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// ✅ Export correctly
export { auth, provider, signInWithPopup, signOut };
