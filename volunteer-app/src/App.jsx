import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import EventManage from './EventManage';
import Footer from './Footer';
import Header from './Header';
import Home from './Home';
import Login from './Login';
import Notifications from './Notifications';
import Profile from './Profile';
import ProtectedRoute from './ProtectedRoute';
import Registration from './Registration';
import VolunteerHistory from './VolunteerHistory';
import VolunteerMatching from './VolunteerMatching';
import ProfileManage from './profileManage';
import AllEvents from './AllEvents';
import Navigation from './Navigation';

const AppContent = () => {
  const { user, logout } = useAuth();

  return (
    <>
      <Header />
      <Navigation />
      <div className="main-content">
        {user ? (
          <>
            <button onClick={logout}>Logout</button>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/registration" element={<Registration />} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/all-events" element={<ProtectedRoute><AllEvents /></ProtectedRoute>} />
              <Route path="/event-management" element={<ProtectedRoute><EventManage /></ProtectedRoute>} />
              <Route path="/profile-management" element={<ProtectedRoute><ProfileManage /></ProtectedRoute>} />
              <Route path="/volunteer-matching" element={<ProtectedRoute><VolunteerMatching /></ProtectedRoute>} />
              <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
              <Route path="/volunteer-history" element={<ProtectedRoute><VolunteerHistory /></ProtectedRoute>} />
            </Routes>
          </>
        ) : (
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
<<<<<<< HEAD
            <Route path="/profile" element={<Profile />} />
            <Route path="/event-management" element={<EventManage />} />
            
            {/* Protected Routes */}
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <Home />
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
              path="/all-events" 
              element={
                <ProtectedRoute>
                  <AllEvents />
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
=======
            <Route path="*" element={<Login />} />
>>>>>>> juan
          </Routes>
        )}
      </div>
      <Footer />
    </>
  );
};

const App = () => (
  <AuthProvider>
    <Router>
      <AppContent />
    </Router>
  </AuthProvider>
);

export default App;
