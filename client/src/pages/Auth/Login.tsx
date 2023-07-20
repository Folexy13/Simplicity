import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { logo } from "../../shared/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { ROUTE } from "..";
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required!"),
  password: Yup.string().required("Paswword is required!"),
});

const Login: React.FC = () => {
  const nav = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = (values: any) => {
    console.log("Form values:", values);
    // Handle form submission logic here, e.g., sending login request
  };

  return (
    <div className="auth-container">
      <div className="left-panel">
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
        <h2>Welcome Back!</h2>
        <h2>Login</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <Field type="email" name="email" placeholder="Email" />
            <ErrorMessage
              name="email"
              component="div"
              className="error-message"
            />

            <Field type="password" name="password" placeholder="Password" />
            <ErrorMessage
              name="password"
              component="div"
              className="error-message"
            />

            <button type="submit">Login</button>
            <span>
              Don't have an account?{" "}
              <NavLink
                to={ROUTE.REGISTER}
                style={{
                  color: "#1313b5",
                  fontStyle: "italic",
                  display: "inline",
                }}
              >
                Create one
              </NavLink>
            </span>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Login;
