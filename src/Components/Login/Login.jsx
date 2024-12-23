import React from "react";
import styles from "./login.module.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function Login() {
  
  const validationSchema = Yup.object({
    username: Yup.string()
      .required("Please enter your email")
      .min(3)
      .matches(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "incorrect email"
      ),
    password: Yup.string().required("password is required").min(6),
  });

  const initialValues = {
    username: "",
    password: "",
  };

  const handleSubmit = ({ setSubmitting }) => {
    setSubmitting(false);
  };

  return (
    <div className={styles.loginConteiner}>
      <div className={styles.logo}>
        <p>Logo</p>
      </div>

      <div className={styles.fieldWrapper}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({isValid }) => (
            <Form className={styles.form}>
              <Field
                type="text"
                name="username"
                id="username"
                placeholder="Enter the Email "
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
                placeholder="Enter the password "
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
  );
}
