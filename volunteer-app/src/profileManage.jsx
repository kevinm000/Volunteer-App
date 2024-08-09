import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './index.css';

const ProfileManage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    skills: [],
    preferences: '',
    availability: [], // Initialize as an empty array
  });

  const skillsOptions = [
    'Communication', 'Teamwork', 'Problem Solving', 'Leadership', 'Time Management'
  ];

  useEffect(() => {
    // Fetch existing profiles data from backend
    axios.get('http://localhost:3000/profiles')
      .then(response => {
        const profile = response.data[0]; // Assuming we take the first profile for demo
        if (profile) {
          setFormData(profile);
        }
      })
      .catch(error => console.error('Error fetching profiles:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleMultiSelectChange = (e) => {
    const options = e.target.options;
    const selectedOptions = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedOptions.push(options[i].value);
      }
    }
    setFormData({
      ...formData,
      skills: selectedOptions,
    });
  };

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    if (start && end) {
      setFormData({
        ...formData,
        availability: [start, end],
      });
    } else if (start) {
      setFormData({
        ...formData,
        availability: [start],
      });
    } else {
      setFormData({
        ...formData,
        availability: [],
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send form data to backend
    axios.post('http://localhost:3000/profiles', formData)
      .then(response => {
        alert('Profile created successfully');
        console.log(response.data);
      })
      .catch(error => console.error('Error creating profile:', error));
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Create Profile</h2>
      <form className="profile-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullName" className="form-label">Full Name (required):</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            className="form-input"
            value={formData.fullName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address1" className="form-label">Address 1 (required):</label>
          <input
            type="text"
            id="address1"
            name="address1"
            className="form-input"
            value={formData.address1}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address2" className="form-label">Address 2:</label>
          <input
            type="text"
            id="address2"
            name="address2"
            className="form-input"
            value={formData.address2}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="city" className="form-label">City (required):</label>
          <input
            type="text"
            id="city"
            name="city"
            className="form-input"
            value={formData.city}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="state" className="form-label">State (required):</label>
          <input
            type="text"
            id="state"
            name="state"
            className="form-input"
            value={formData.state}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="zipCode" className="form-label">Zip Code (required):</label>
          <input
            type="text"
            id="zipCode"
            name="zipCode"
            className="form-input"
            value={formData.zipCode}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="skills" className="form-label">Skills (required):</label>
          <select
            id="skills"
            name="skills"
            className="form-input"
            multiple
            value={formData.skills}
            onChange={handleMultiSelectChange}
            required
          >
            {skillsOptions.map((skill) => (
              <option key={skill} value={skill}>
                {skill}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="preferences" className="form-label">Preferences:</label>
          <input
            type="text"
            id="preferences"
            name="preferences"
            className="form-input"
            value={formData.preferences}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="availability" className="form-label">Availability:</label>
          <DatePicker
            selected={formData.availability[0]}
            startDate={formData.availability[0]}
            endDate={formData.availability[1]}
            onChange={handleDateChange}
            selectsRange
            inline
            isClearable
          />
        </div>
        <button type="submit" className="form-button">Save Profile</button>
      </form>
    </div>
  );
};

export default ProfileManage;
