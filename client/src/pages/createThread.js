import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

function createThread() {
  const initialValue = {
    title: "",
    threadText: "",
    username: "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required(),
    threadText: Yup.string().required(),
    username: Yup.string().min(3).max(15).required(),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:5001/", data).then((response) => {
      console.log("It worked!");
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
          <label>Title: </label>
          <ErrorMessage name="title" component="span"></ErrorMessage>
          <Field id="inputTitle" name="title" placeholder="Title..." />
          <label>Thread: </label>
          <ErrorMessage name="threadText" component="span"></ErrorMessage>
          <Field id="inputThreadText" name="threadText" placeholder="Text..." />
          <label>Username: </label>
          <ErrorMessage name="username" component="span"></ErrorMessage>
          <Field id="inputUsername" name="username" placeholder="Username..." />
          <button type="submit">Create Thread</button>
        </Form>
      </Formik>
    </div>
  );
}

export default createThread;
