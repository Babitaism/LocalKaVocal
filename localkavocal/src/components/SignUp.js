import { useEffect, useState } from "react";
import React from "react";
import { Outlet, Link } from "react-router-dom";
import Validation from "./Validation";
import { SERVER_END_POINT } from "../configs/configuration";
import callApi from "../httpClientWrapper/callApi";

function SignUp(props) {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [submitted, setSubmitted] = React.useState(false);
  const [errors, setErrors] = React.useState({});

  useEffect(() => {
    console.log("Registered");
  }, [submitted]);

  function handleRequest(req) {
    const signUpData = {
      endPoint: "signup",
      method: "POST",
      body: JSON.stringify({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
      }),
      headers: {
        "Content-type": "application/json",
      },
    };
    callApi(signUpData)
      .then((response) => response.json())
      .then((json) => {
        console.log(json, "ll");
      })
      .catch(function (err) {
        console.log("----", err);
      });
  }

  function loginForm() {
    return (
      <div className="sign">
        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="fname">First name:</label>
          <br></br>
          <input
            className="fname"
            type="text"
            id="fname"
            name="fname"
            value={values.firstName}
            placeholder="FirstName"
            onChange={handleChangeFname}
          ></input>
          {errors.firstName && (
            <pre style={{ color: "red" }}>{errors.firstName}</pre>
          )}
          <br></br>
          <label htmlFor="lname">Last name:</label>
          <br></br>
          <input
            className="lname"
            type="text"
            id="lname"
            name="lname"
            value={values.lastName}
            placeholder="LastName"
            onChange={handleChangeLname}
          ></input>
          {errors.lastName && (
            <pre style={{ color: "red" }}>{errors.lastName}</pre>
          )}
          <br></br>
          <label htmlFor="email">Email:</label>
          <br></br>
          <input
            className="email"
            type="email"
            id="email"
            name="email"
            placeholder="E-mail"
            value={values.email}
            onChange={handleChangeEmail}
          ></input>
          <br></br>
          {errors.email && <pre style={{ color: "red" }}>{errors.email}</pre>}
          {/* {(!submitted && !values.email) ? (
            <pre className="span"> Please enter emailId </pre>
          ) : (
            ""
          )} */}
          <label htmlFor="password">Password:</label>
          <br></br>
          <input
            className="password"
            type="password"
            id="password"
            name="password"
            placeholder="Enter Password"
            value={values.password}
            onChange={handleChangePassword}
          ></input>
          {errors.password && (
            <pre style={{ color: "red" }}>{errors.password}</pre>
          )}
          <br></br>
          <br></br>
          <input
            className="submit"
            type="submit"
            value="Submit"
            onClick={handleRequest}
          ></input>
          <br></br>
        </form>
      </div>
    );
  }

  function handleChangeFname(event) {
    setValues({ ...values, firstName: event.target.value });
    console.log(values.firstName, "values");
    props.babita(values.firstName);
  }

  function handleChangeLname(event) {
    setValues({ ...values, lastName: event.target.value });
  }

  function handleChangeEmail(event) {
    setValues({ ...values, email: event.target.value });
  }

  function handleChangePassword(event) {
    setValues({ ...values, password: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!values.email) {
      setErrors(Validation(values));
    } else {
      setSubmitted(true);
    }
    if (!values.password) {
      setErrors(Validation(values));
    } else {
      setSubmitted(true);
    }
  }

  return (
    <>
      <pre className="submitmsg">
        {submitted ? (
          <h2>
            "Hello You have registered successfully,please click on LogIn Page"
          </h2>
        ) : (
          ""
        )}{" "}
      </pre>
      {loginForm()}
      <div className="sub">
        <Link style={{ textDecoration: "none" }} to="/login">
          Login
        </Link>
      </div>
    </>
  );
}

export default SignUp;
