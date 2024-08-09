import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Home = () => {
  const [profile, setProfile] = useState(null);
  const { user } = useAuth(); // Assuming user contains the token
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get('http://localhost:3000/api/profiles/', {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Check if response data is as expected
        if (response.data) {
          setProfile(response.data);
        } else {
          console.error('No profile data received');
          navigate('/login'); // Redirect if there's an issue with data
        }
      } catch (error) {
        //console.error('Error fetching user profile:', error);
        //navigate('/login'); // Redirect if there’s an issue fetching the profile
      }
    };

    // Fetch profile only if user is authenticated
    if (user) {
      fetchProfile();
    } else {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <div>
      {user ? (
        <h1>Welcome Back, {profile ? profile.fullName : 'Loading...'}</h1>
      ) : (
        <h1>Please Log In</h1>
      )}
    </div>
  );
};

export default Home;

