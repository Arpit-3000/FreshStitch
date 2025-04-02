import React from "react";
import AdminDashboard from "./AdminDashboard";


const App = () => {
  return (

    <Router>
      <AdminDashboard />
      <Chatbot/>
    </Router>

  );
};