import React, { useState,useEffect } from "react";
import Sidebar from "./Components/sidebar/Sidebar";
import Login from "./Components/Login/Login";
import Service from "./Components/Service/Service";
import "./App.css";
import Project from "./Components/Projects/Project";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Meny from "./Components/menu/Meny";
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
          <Route path="/Exports" element={<Project />} />
          <Route path="/Client" element={<h1>Client Page</h1>} />
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
