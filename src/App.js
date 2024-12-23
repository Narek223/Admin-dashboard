import React, { useState } from "react";
import Sidebar from "./Components/sidebar/Sidebar";
import Login from "./Components/Login/Login";
import "./App.css";
import Project from "./Components/Projects/Project";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); 

  return (
    <div>
     <Login/>

    {/* <div className={`app-container ${isSidebarOpen ? "" : "sidebar-closed"}`}>
     <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} /> 
      <Login/>
      <div className="content">
        <Routes>
          <Route path="/" element={<h1>main </h1>} />
          <Route path="/Dashboard" element={<h1>Dashboard page</h1>} />
          <Route path="/Projects" element={<Project />} />
          <Route path="/Tasks" element={<h1>Tasks Page</h1>} />
          <Route path="/Reporting" element={<h1>Reporting Page</h1>} />
        </Routes> 
      </div>
</div> */}
    </div>
  );
}

export default App;
