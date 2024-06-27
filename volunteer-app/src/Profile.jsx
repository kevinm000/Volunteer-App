
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Profile = () => {
  const profileForm = useFormik({
    initialValues: {
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
      <h2>Profile Management</h2>
      <form onSubmit={profileForm.handleSubmit}>
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input id="fullName" type="text" {...profileForm.getFieldProps('fullName')} />
          {profileForm.touched.fullName && profileForm.errors.fullName ? (
            <div>{profileForm.errors.fullName}</div>
          ) : null}
        </div>
        <div>
          <label htmlFor="address1">Address 1</label>
          <input id="address1" type="text" {...profileForm.getFieldProps('address1')} />
          {profileForm.touched.address1 && profileForm.errors.address1 ? (
            <div>{profileForm.errors.address1}</div>
          ) : null}
        </div>
        <div>
          <label htmlFor="address2">Address 2</label>
          <input id="address2" type="text" {...profileForm.getFieldProps('address2')} />
          {profileForm.touched.address2 && profileForm.errors.address2 ? (
            <div>{profileForm.errors.address2}</div>
          ) : null}
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input id="city" type="text" {...profileForm.getFieldProps('city')} />
          {profileForm.touched.city && profileForm.errors.city ? (
            <div>{profileForm.errors.city}</div>
          ) : null}
        </div>
        <div>
          <label htmlFor="state">State</label>
          <select id="state" {...profileForm.getFieldProps('state')}>
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
          {profileForm.touched.state && profileForm.errors.state ? (
            <div>{profileForm.errors.state}</div>
          ) : null}
        </div>
        <div>
          <label htmlFor="zipCode">Zip Code</label>
          <input id="zipCode" type="text" {...profileForm.getFieldProps('zipCode')} />
          {profileForm.touched.zipCode && profileForm.errors.zipCode ? (
            <div>{profileForm.errors.zipCode}</div>
          ) : null}
        </div>
        <div>
          <label htmlFor="skills">Skills</label>
          <select id="skills" multiple {...profileForm.getFieldProps('skills')}>
          <option value="Communication">Communication</option>
  <option value="Teamwork">Teamwork</option>
  <option value="Problem Solving">Problem Solving</option>
  <option value="Leadership">Leadership</option>
  <option value="Time Management">Time Management</option>
  <option value="Adaptability">Adaptability</option>
  <option value="Empathy">Empathy</option>
  <option value="Conflict Resolution">Conflict Resolution</option>
  <option value="Decision Making">Decision Making</option>
  <option value="Creativity">Creativity</option>
  <option value="Critical Thinking">Critical Thinking</option>
  <option value="Flexibility">Flexibility</option>
  <option value="Patience">Patience</option>
  <option value="Negotiation">Negotiation</option>
  <option value="Networking">Networking</option>
            {/* Add more skills options as needed */}
          </select>
          {profileForm.touched.skills && profileForm.errors.skills ? (
            <div>{profileForm.errors.skills}</div>
          ) : null}
        </div>
        <div>
          <label htmlFor="preferences">Preferences</label>
          <textarea id="preferences" {...profileForm.getFieldProps('preferences')} />
          {profileForm.touched.preferences && profileForm.errors.preferences ? (
            <div>{profileForm.errors.preferences}</div>
          ) : null}
        </div>
        <div>
          <label htmlFor="availability">Availability</label>
          <input id="availability" type="date" {...profileForm.getFieldProps('availability')} multiple />
          {profileForm.touched.availability && profileForm.errors.availability ? (
            <div>{profileForm.errors.availability}</div>
          ) : null}
        </div>
        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
};

export default Profile;
