import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const Registration = () => {
  const navigate = useNavigate();

  const registrationForm = useFormik({
    initialValues: {
      email: '',
      password: '',
      fullName: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zipCode: '',
      skills: [],
      preferences: '',
      availability: [], // Initialize with empty array
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
      fullName: Yup.string().required('Required'),
      address1: Yup.string().required('Required'),
      city: Yup.string().required('Required'),
      state: Yup.string().required('Required'),
      zipCode: Yup.string().required('Required'),
      skills: Yup.array().min(1, 'At least one skill is required').required('Required'),
    }),
    onSubmit: async (values) => {
      // Format dates
      const formattedAvailability = values.availability.map(date => date.toISOString());

      try {
        // Send data to backend
        await axios.post('http://localhost:3000/api/auth/register', {
          ...values,
          availability: formattedAvailability,
        });
        navigate('/home'); // Redirect to home page or another page after registration
      } catch (error) {
        alert('Registration failed: ' + (error.response?.data?.message || error.message));
      }
    },
  });

  const handleDateChange = (dates) => {
    const [startDate, endDate] = dates;
    registrationForm.setFieldValue('availability', [startDate, endDate]);
  };

  return (
    <div className="registration-container">
      <h2>Registration</h2>
      <form onSubmit={registrationForm.handleSubmit}>
        {/* Initial Registration Fields */}
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" {...registrationForm.getFieldProps('email')} />
          {registrationForm.touched.email && registrationForm.errors.email ? (
            <div>{registrationForm.errors.email}</div>
          ) : null}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" {...registrationForm.getFieldProps('password')} />
          {registrationForm.touched.password && registrationForm.errors.password ? (
            <div>{registrationForm.errors.password}</div>
          ) : null}
        </div>

        {/* Profile Management Fields */}
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input id="fullName" type="text" {...registrationForm.getFieldProps('fullName')} />
          {registrationForm.touched.fullName && registrationForm.errors.fullName ? (
            <div>{registrationForm.errors.fullName}</div>
          ) : null}
        </div>
        <div>
          <label htmlFor="address1">Address 1</label>
          <input id="address1" type="text" {...registrationForm.getFieldProps('address1')} />
          {registrationForm.touched.address1 && registrationForm.errors.address1 ? (
            <div>{registrationForm.errors.address1}</div>
          ) : null}
        </div>
        <div>
          <label htmlFor="address2">Address 2</label>
          <input id="address2" type="text" {...registrationForm.getFieldProps('address2')} />
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input id="city" type="text" {...registrationForm.getFieldProps('city')} />
          {registrationForm.touched.city && registrationForm.errors.city ? (
            <div>{registrationForm.errors.city}</div>
          ) : null}
        </div>
        <div>
          <label htmlFor="state">State</label>
          <input id="state" type="text" {...registrationForm.getFieldProps('state')} />
          {registrationForm.touched.state && registrationForm.errors.state ? (
            <div>{registrationForm.errors.state}</div>
          ) : null}
        </div>
        <div>
          <label htmlFor="zipCode">Zip Code</label>
          <input id="zipCode" type="text" {...registrationForm.getFieldProps('zipCode')} />
          {registrationForm.touched.zipCode && registrationForm.errors.zipCode ? (
            <div>{registrationForm.errors.zipCode}</div>
          ) : null}
        </div>
        <div>
          <label htmlFor="skills">Skills</label>
          <select
            id="skills"
            name="skills"
            multiple
            {...registrationForm.getFieldProps('skills')}
          >
            {['Communication', 'Teamwork', 'Problem Solving', 'Leadership', 'Time Management'].map((skill) => (
              <option key={skill} value={skill}>
                {skill}
              </option>
            ))}
          </select>
          {registrationForm.touched.skills && registrationForm.errors.skills ? (
            <div>{registrationForm.errors.skills}</div>
          ) : null}
        </div>
        <div>
          <label htmlFor="preferences">Preferences</label>
          <input id="preferences" type="text" {...registrationForm.getFieldProps('preferences')} />
        </div>
        <div>
          <label htmlFor="availability">Availability</label>
          <DatePicker
            selected={registrationForm.values.availability[0]}
            onChange={handleDateChange}
            startDate={registrationForm.values.availability[0]}
            endDate={registrationForm.values.availability[1]}
            selectsRange
            inline
            isClearable
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Registration;
