import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

function createThread() {
  return (
    <div className="createThreadPage">
      {" "}
      <Formik>
        <Form>
          <Field id="inputCreateThread" name="title" placeholder="Title" />
        </Form>
      </Formik>
    </div>
  );
}

export default createThread;
