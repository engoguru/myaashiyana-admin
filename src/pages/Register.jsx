import  { useEffect } from "react";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { createAdmin } from "../features/auth/authSlice";
import CustomInput from "../components/CustomInput";
import { message } from "antd";

let Schema = yup.object().shape({
  username: yup.string().required("Username Is Required."),
  phone: yup.number().required("Phone Number Is Required."),
  email: yup.string().email('Email should be valid').required('Email Is Required'),
  role: yup.string().required('Role Is Required'),
  password: yup.string().required('Password Is Required'),
});

const Register = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      username: '',
      phone:'',
      role:'',
      email: '',
      password: '',
    },
    validationSchema: Schema,
    onSubmit: (values) => {
      dispatch(createAdmin(values));
      navigate("/login")
    },
  });
  
  
  return (
    <>
      <div className='py-5' style={{ background: "#1677FF", minHeight: "100vh" }}>
        <br />
        <br />
        <br/>
        <div className='my-5 w-25 bg-white rounded-3 mx-auto p-4'>
          <h3 className='text-center'>Register</h3>
          <p className='text-center'>Create your account to continue</p>


          <div className='error text-center'>
            {message.message == "Rejected" ? "Yor are not an Admin" : ""}
          </div>

          <form action='' onSubmit={formik.handleSubmit}>
             <CustomInput
                type='text'
                name='username'
                label="User Name"
                id="username"
                val={formik.values.username}
                onCh={formik.handleChange('username')} 
                onBl={formik.handleBlur("username")}
              />
              <div className='error'>
            {formik.touched.username && formik.errors.username ? (
                <div>{formik.errors.username}</div>
            ) : null}
          </div>

              <CustomInput
                type='number'
                name='phone'
                label="Phone Number"
                id="phone"
                val={formik.values.phone}
                onCh={formik.handleChange('phone')} 
                onBl={formik.handleBlur("phone")}
              />
               <div className='error'>
            {formik.touched.phone && formik.errors.phone ? (
                <div>{formik.errors.phone}</div>
            ) : null}
          </div>

            <CustomInput
              type='email'
              name='email'
              label="Email Address"
              id="email"
              val={formik.values.email}
              onCh={formik.handleChange('email')} 
              onBl={formik.handleBlur("email")}
            />

            <div className='error'>
            {formik.touched.email && formik.errors.email ? (
                <div>{formik.errors.email}</div>
            ) : null}
          </div>

          <CustomInput
              type='text'
              name='role'
              label="Enter role"
              id="role"
              val={formik.values.role}
              onCh={formik.handleChange('role')} 
              onBl={formik.handleBlur("role")}
            />

            <div className='error'>
            {formik.touched.role && formik.errors.role ? (
                <div>{formik.errors.role}</div>
            ) : null}
          </div>
            
            <CustomInput
              type='password'
              name='password'
              label="Password"
              id="pass"
              val={formik.values.password}
              onCh={formik.handleChange('password')} 
              onBl={formik.handleBlur("password")}
            />
            <div className='error'>
            {formik.touched.password && formik.errors.password ? (
                <div>{formik.errors.password}</div>
            ) : null}
            </div>
            
            <button
              className='border-0 px-3 mt-3 py-2 text-light fw-bold w-100 text-center text-decoration-none'
              style={{ background: "#1677FF" }} type='submit'>
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Register
