import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../helpers/AuthProvider";
import { useEffect } from 'react';

function CreateThread() {
  let navigate = useNavigate();
  let auth = useAuth();

  useEffect(() => {
    if (!auth.authState) {
      navigate("/login");
    }
  }, [auth, navigate]);


  const initialValue = {
    title: "",
    threadText: "",
    username: auth.user,
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required(),
    threadText: Yup.string().required(),
  });

  const onSubmit = (data) => {
    const token = localStorage.getItem("accessToken");
    axios
    .post("http://62.178.154.233:5001/", data, {
      headers: {
        'auth-token': `Bearer ${token}`
      }})
    .then((response) => {
      navigate("/");
    })
    .catch((error) => {
      if (error.response && error.response.status === 400) {
        alert("Please login or register to use this function");
      }
    });
  };

  return (
    <div className="createThreadPage">
      {" "}
      <Formik
        initialValues={initialValue}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="inputForm">
          <label className="createThreadTitle">Title</label>
          <div className="inputTitleDiv" >
          <Field  className="inputThread" id="inputTitle" name="title" placeholder="Your title..." />
          </div>
          <div>
          <ErrorMessage className="errorUser" name="title" component="span"></ErrorMessage>
          </div>
          <label className="createThreadTitle">Your Text</label>
          <div>
          <Field 
          className="inputThread1" 
          id="inputThreadText" 
          name="threadText" 
          placeholder="Your text..."
          component="textarea"
          />
          
          </div>
          <div>
          <ErrorMessage className="errorUser" name="threadText" component="span"></ErrorMessage>
          </div>
          <div className="createThreadBtn1">
          <button className="inputThreadBtn" type="submit">Create Thread</button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default CreateThread;
