
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Registration = () => {
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
      availability: []
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
      fullName: Yup.string().max(50, 'Must be 50 characters or less').required('Required'),
      address1: Yup.string().max(100, 'Must be 100 characters or less').required('Required'),
      address2: Yup.string().max(100, 'Must be 100 characters or less'),
      city: Yup.string().max(100, 'Must be 100 characters or less').required('Required'),
      state: Yup.string().max(2, 'Must be 2 characters').required('Required'),
      zipCode: Yup.string().matches(/^[0-9]{5}(-[0-9]{4})?$/, 'Invalid zip code').required('Required'),
      skills: Yup.array().min(1, 'At least one skill is required').required('Required'),
      preferences: Yup.string(),
      availability: Yup.array().min(1, 'At least one date is required').required('Required')
    }),
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    }
  });

  return (
    <div className="registration-container">
      <h2>User Registration</h2>
      <form onSubmit={registrationForm.handleSubmit}>
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Registration;
