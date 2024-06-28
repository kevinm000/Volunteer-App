
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header';
import Login from './Login';
import Registration from './Registration';
import Footer from './Footer';
import Profile from './Profile';
import EventManage from './EventManage';
import Notifications from './Notifications';


function App() {
  return (
    <Router>
      <Header />
      <div className="main-content">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/profile" element={<Profile />} />
        {/* Define other routes here */}
        <Route path="/event-management" element={<EventManage />} />
        <Route path="/notifications" element={<Notifications />} />
        
        <Route path="/" element={<div><h2>The Volunteer</h2></div>} />

        
      </Routes>
      </div>
      <Footer/>
    </Router>
  );
}

export default App;
