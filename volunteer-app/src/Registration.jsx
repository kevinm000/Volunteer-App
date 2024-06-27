
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

        <h2>Profile Management</h2>
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
          {registrationForm.touched.address2 && registrationForm.errors.address2 ? (
            <div>{registrationForm.errors.address2}</div>
          ) : null}
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
          <select id="state" {...registrationForm.getFieldProps('state')}>
            <option value="" label="Select state" />
            <option value="AL" label="Alabama" />
            <option value="AK" label="Alaska" />
            <option value="AZ" label="Arizona" />
            <option value="AR" label="Arkansas" />
            <option value="CA" label="California" />
            <option value="CO" label="Colorado" />
            <option value="CT" label="Connecticut" />
            <option value="DE" label="Delaware" />
            <option value="FL" label="Florida" />
            <option value="GA" label="Georgia" />
            <option value="HI" label="Hawaii" />
            <option value="ID" label="Idaho" />
            <option value="IL" label="Illinois" />
            <option value="IN" label="Indiana" />
            <option value="IA" label="Iowa" />
            <option value="KS" label="Kansas" />
            <option value="KY" label="Kentucky" />
            <option value="LA" label="Louisiana" />
            <option value="ME" label="Maine" />
            <option value="MD" label="Maryland" />
            <option value="MA" label="Massachusetts" />
            <option value="MI" label="Michigan" />
            <option value="MN" label="Minnesota" />
            <option value="MS" label="Mississippi" />
            <option value="MO" label="Missouri" />
            <option value="MT" label="Montana" />
            <option value="NE" label="Nebraska" />
            <option value="NV" label="Nevada" />
            <option value="NH" label="New Hampshire" />
            <option value="NJ" label="New Jersey" />
            <option value="NM" label="New Mexico" />
            <option value="NY" label="New York" />
            <option value="NC" label="North Carolina" />
            <option value="ND" label="North Dakota" />
            <option value="OH" label="Ohio" />
            <option value="OK" label="Oklahoma" />
            <option value="OR" label="Oregon" />
            <option value="PA" label="Pennsylvania" />
            <option value="RI" label="Rhode Island" />
            <option value="SC" label="South Carolina" />
            <option value="SD" label="South Dakota" />
            <option value="TN" label="Tennessee" />
            <option value="TX" label="Texas" />
            <option value="UT" label="Utah" />
            <option value="VT" label="Vermont" />
            <option value="VA" label="Virginia" />
            <option value="WA" label="Washington" />
            <option value="WV" label="West Virginia" />
            <option value="WI" label="Wisconsin" />
            <option value="WY" label="Wyoming" />
          </select>
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
          <select id="skills" multiple {...registrationForm.getFieldProps('skills')}>
            <option value="skill1">Skill 1</option>
            <option value="skill2">Skill 2</option>
            <option value="skill3">Skill 3</option>
            {/* Add more skills as needed */}
          </select>
          {registrationForm.touched.skills && registrationForm.errors.skills ? (
            <div>{registrationForm.errors.skills}</div>
          ) : null}
        </div>
        <div>
          <label htmlFor="preferences">Preferences</label>
          <textarea id="preferences" {...registrationForm.getFieldProps('preferences')} />
          {registrationForm.touched.preferences && registrationForm.errors.preferences ? (
            <div>{registrationForm.errors.preferences}</div>
          ) : null}
        </div>
        <div>
          <label htmlFor="availability">Availability</label>
          <input id="availability" type="date" {...registrationForm.getFieldProps('availability')} multiple />
          {registrationForm.touched.availability && registrationForm.errors.availability ? (
            <div>{registrationForm.errors.availability}</div>
          ) : null}
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Registration;
