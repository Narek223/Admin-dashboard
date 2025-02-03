import React, { useState } from "react";
import styles from "./login.module.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function Login({ onSuccess }){

  const validationSchema = Yup.object({
    username: Yup.string()
      .required("Please enter your email")
      .min(3)
      .matches(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "incorrect email"
      ),
    password: Yup.string().required("password is required").min(6).max(20),
  });

  const initialValues = {
    username: "",
    password: "",
  };

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    if (values.username && values.password) {
      localStorage.setItem("token", "login");
      onSuccess();
    }
    console.log("Form submitted", values);
  };

  return (
    <div className={styles.loginConteiner}>
      <div className={styles.logobox}>
        <div className={styles.logo}></div>
      </div>

      <div className={styles.fieldWrapper}>
        <div className={styles.formbox}>
          <div className={styles.textbox}>
            <h1>Hey,hello👋 </h1>
            <p>Let’s Get Started!</p>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isValid }) => (
              <Form className={styles.form}>
                <Field
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Login "
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className={styles.error}
                />

                <Field
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password "
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className={styles.error}
                />

                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={!isValid}
                >
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
