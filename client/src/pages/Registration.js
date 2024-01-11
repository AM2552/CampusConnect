import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../helpers/AuthProvider";

const RegistrationSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .max(15, 'Username must be at most 15 characters')
    .required('Username is required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .min(4, 'Password must be at least 4 characters')
    .max(20, 'Password must be at most 20 characters')
    .required('Password is required'),
});

function Registration() {
    let navigate = useNavigate();
    let auth = useAuth();
  return (
    <div className="mainDivReg">
      <label className="registerLabelDiv">Register</label>
    <div className="registrationContainer">
      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        validationSchema={RegistrationSchema}
        onSubmit={(values, { setSubmitting }) => {
          axios
            .post("http://localhost:5001/users/signup", values)
            .then((response) => {
              if (response.data.error) {
                alert(response.data.error);
                setSubmitting(false);
              } else {
                // localStorage.setItem("accessToken", response.data.token.split(' ')[1]);
                alert(response.data.msg)
                navigate("/login")
              }
            })
            .catch((error) => {
                if (error.response && error.response.status === 400) {
                  alert(error.response.data.msg);
                }
                setSubmitting(false);
              });

            
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
            <Field 
            type="text" 
            name="username" 
            className="regUserName" 
            placeholder="Enter a Username"/>
            <ErrorMessage name="username" component="div" className="errorUser"/>
            </div>
            <div>
            <Field 
            type="email" 
            name="email" 
            className="regUserEmail"
            placeholder="Enter your Email"/>
            <ErrorMessage name="email" component="div" className="errorUser" />
            </div>
            <div>
            <Field 
            type="password" 
            name="password"
            className="regUserPwd"
            placeholder="Enter a password"/>
            <ErrorMessage name="password" component="div" className="errorUser" />
            </div>
            <div className="regPageBtnDiv">
            <button type="submit" disabled={isSubmitting} 
            className="regPageBtn">
              Register
            </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
    </div>
  );
}

export default Registration;
