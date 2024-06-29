
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Header from './Header';
import Login from './Login';
import Registration from './Registration';
import Footer from './Footer';
import Profile from './Profile';
import EventManage from './EventManage';
import VolunteerMatching from './VolunteerMatching';
import Notifications from './Notifications';


function App() {
  return (
    <Router>
      <Header />
      <div className="main-content">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/profile" element={<Profile />} />
        {/* Define other routes here */}
        <Route path="/event-management" element={<EventManage />} />
        <Route path="/volunteer-matching" element={<VolunteerMatching />} />
        <Route path="/notifications" element={<Notifications />} />
        


      </Routes>
      </div>
      <Footer/>
    </Router>
  );
}

export default App;
