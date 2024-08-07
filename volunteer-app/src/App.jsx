
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import EventManage from './EventManage';
import Footer from './Footer';
import Header from './Header';
import Home from './Home';
import Login from './Login';
import Notifications from './Notifications';
import Profile from './Profile';
import ProtectedRoute from './ProtectedRoute'; // Create this component for route protection
import Registration from './Registration';
import VolunteerHistory from './VolunteerHistory';
import VolunteerMatching from './VolunteerMatching';
import ProfileManage from './profileManage'; // Adjusted import to match file name

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/event-management" element={<EventManage />} />
            
            {/* Protected Routes */}
            <Route 
              path="/profile-management" 
              element={
                <ProtectedRoute>
                  <ProfileManage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/volunteer-matching" 
              element={
                <ProtectedRoute>
                  <VolunteerMatching />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/notifications" 
              element={
                  <Notifications />
              } 
            />
            <Route 
              path="/volunteer-history" 
              element={
                <ProtectedRoute>
                  <VolunteerHistory />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;

