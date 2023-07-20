import React, { useState } from "react";
import "./styles.scss";
import { logo } from "../../shared/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { ROUTE } from "..";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Registration: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const initialValues = {
    fullName: "",
    email: "",
    phoneCode: "",
    phoneNumber: "",
    countryOfResidence: "",
    countryOfBirth: "",
    dateOfBirth: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phoneCode: Yup.string()
      .required("Phone Code is required")
      .matches(/^\+/, "Invalid Phone Code"),
    phoneNumber: Yup.string().required("Phone Number is required"),
    countryOfResidence: Yup.string().required(
      "Country of Residence is required"
    ),
    countryOfBirth: Yup.string().required("Country of Birth is required"),
    dateOfBirth: Yup.string().required("Date of Birth is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), ""], "Passwords must match"),
  });

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleSubmit = (values: any) => {
    // Handle form submission logic here, e.g., sending registration request
    console.log(values);
  };

  const nav = useNavigate()

  return (
    <div className="auth-container">
      <div className="left-panel register">
        <div
          className="tab"
          style={{ cursor: "pointer" }}
          onClick={() => nav(ROUTE.HOME)}
        >
          <h1 style={{ textAlign: "center" }}>
            <img src={logo} alt="" />
            <p>Simplicity</p>
          </h1>
          <p>Making study fun and simple</p>
        </div>
      </div>
      <div className="right-panel">
        <h2>Begin a great leap!</h2>
        <h2>Register</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              {currentStep === 1 && (
                <>
                  <Field type="text" name="fullName" placeholder="Full Name" />
                  <ErrorMessage
                    name="fullName"
                    component="div"
                    className="error-message"
                  />

                  <Field type="email" name="email" placeholder="Email" />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error-message"
                  />

                  <Field
                    type="text"
                    name="phoneCode"
                    placeholder="Phone Code"
                  />
                  <ErrorMessage
                    name="phoneCode"
                    component="div"
                    className="error-message"
                  />

                  <Field
                    type="text"
                    name="phoneNumber"
                    placeholder="Phone Number"
                  />
                  <ErrorMessage
                    name="phoneNumber"
                    component="div"
                    className="error-message"
                  />
                </>
              )}

              {currentStep === 2 && (
                <>
                  <Field
                    type="text"
                    name="countryOfResidence"
                    placeholder="Country of Residence"
                  />
                  <ErrorMessage
                    name="countryOfResidence"
                    component="div"
                    className="error-message"
                  />

                  <Field
                    type="text"
                    name="countryOfBirth"
                    placeholder="Country of Birth"
                  />
                  <ErrorMessage
                    name="countryOfBirth"
                    component="div"
                    className="error-message"
                  />

                  <Field
                    type="date"
                    name="dateOfBirth"
                    placeholder="Date of Birth"
                  />
                  <ErrorMessage
                    name="dateOfBirth"
                    component="div"
                    className="error-message"
                  />
                </>
              )}

              {currentStep === 3 && (
                <>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email"
                    disabled
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error-message"
                  />

                  <Field
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error-message"
                  />

                  <Field
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="error-message"
                  />
                </>
              )}

              <div className="button-container">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={() => setCurrentStep((prevStep) => prevStep - 1)}
                  >
                    Previous
                  </button>
                )}

                {currentStep < 3 && (
                  <button type="button" onClick={handleNextStep}>
                    Next
                  </button>
                )}

                {currentStep === 3 && <button type="submit">Register</button>}
              </div>
            </Form>
          )}
        </Formik>

        <span>
          Already have an account?{" "}
          <NavLink
            to={ROUTE.LOGIN}
            style={{
              color: "#1313b5",
              fontStyle: "italic",
              display: "inline",
            }}
          >
            Login
          </NavLink>
        </span>

        <div className="progress-bar">
          <div className={`progress ${currentStep > 1 ? "active" : ""}`} />
          <div className={`progress ${currentStep > 2 ? "active" : ""}`} />
        </div>
      </div>
    </div>
  );
};

export default Registration;
