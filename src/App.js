import React, { useState, useEffect } from "react";
import Sidebar from "./Components/sidebar/Sidebar";
import Login from "./Components/Login/Login";
import Service from "./Components/Service/Service";
import "./App.css";
import Experts from "./Components/Experts/Experts";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Client from "./Components/Client/Client";
import BookingAlerts from "./Components/BookingAlerts/BookingAlerts";
import Availability from "./Components/Availability/Availability";
import Blog from "./Components/Blog/Blog";
import Categories from "./Components/Categories/Categories";
import Inbox from "./Components/Inbox/Inbox";


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
      {!isLoggedIn ? (
        <Login onSuccess={handleLoginSuccess} />
      ) : (
        <div
          className={`app-container ${isSidebarOpen ? "" : "sidebar-closed"}`}
        >
          <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
          <div className="content">
            <Routes>
              <Route path="/" element={null} />
              <Route path="/Services" element={<Service />} />
              <Route path="/Experts" element={<Experts />} />
              <Route path="/Client" element={<Client />} />
              <Route path="/Blog" element={<Blog/>} />
              <Route path="/Categories" element={<Categories/>} />
              <Route path="/BookingAlerts" element={<BookingAlerts/>} />
              <Route path="/Availability" element={<Availability/>} />
              <Route path="/lnbox" element={<Inbox/>} />
            </Routes>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
