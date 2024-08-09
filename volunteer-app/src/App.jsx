import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Header from './Header';
import Home from './Home';
import Login from './Login';
import Registration from './Registration';
import Profile from './Profile';
import AllEvents from './AllEvents';
import EventManage from './EventManage';
import ProfileManage from './profileManage';
import VolunteerMatching from './VolunteerMatching';
import Notifications from './Notifications';
import VolunteerHistory from './VolunteerHistory';
import ProtectedRoute from './ProtectedRoute'; // Create this component for route protection

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
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/all-events" 
              element={
                <ProtectedRoute>
                  <AllEvents />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/event-management" 
              element={
                <ProtectedRoute>
                  <EventManage />
                </ProtectedRoute>
              } 
            />
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
                <ProtectedRoute>
                  <Notifications />
                </ProtectedRoute>
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
      </Router>
    </AuthProvider>
  );
}

export default App;
