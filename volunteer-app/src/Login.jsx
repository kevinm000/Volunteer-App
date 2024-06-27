import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './index.css';

const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Required')
    }),
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    }
  });

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            {...formik.getFieldProps('email')}
          />
          {formik.touched.email && formik.errors.email ? (
            <div>{formik.errors.email}</div>
          ) : null}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            {...formik.getFieldProps('password')}
          />
          {formik.touched.password && formik.errors.password ? (
            <div>{formik.errors.password}</div>
          ) : null}
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;