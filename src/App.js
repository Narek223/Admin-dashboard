import React, { useState,useEffect } from "react";
import Sidebar from "./Components/sidebar/Sidebar";
import Login from "./Components/Login/Login";
import Service from "./Components/Service/Service";
import "./App.css";
import Experts from "./Components/Experts/Experts";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Client from './Components/Client/Client'



function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);  

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);  
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div>
  

  {!isLoggedIn?
(
 <Login onSuccess={handleLoginSuccess} /> 
):
  (

<div className={`app-container ${isSidebarOpen ? "" : "sidebar-closed"}`}>
     <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} /> 
 
      <div className="content">
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/Services" element={<Service/>} />
          <Route path="/Experts" element={<Experts />} />
          <Route path="/Client" element={<Client/>} />
          <Route path="/Blog" element={<h1>Blog Page</h1>} />
          <Route path="/Categories" element={<h1>Categories Page</h1>} />
        </Routes> 
      </div>
</div> 



  )} 
  



    
   
    </div>
  );
}

export default App;
