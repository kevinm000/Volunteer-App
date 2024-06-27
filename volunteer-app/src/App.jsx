
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header';
import Login from './Login';
import Registration from './Registration';
import Footer from './Footer';

function App() {
  return (
    <Router>
      <Header />
      <div className="main-content">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        {/* Define other routes here */}
        <Route path="/" element={<div><h2>Home Page</h2></div>} />
      </Routes>
      </div>
      <Footer/>
    </Router>
  );
}

export default App;
