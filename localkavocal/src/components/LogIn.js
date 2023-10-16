import {  useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import Validation from "./Validation";
import { useDispatch } from "react-redux";
import { loginAction } from "../actions/action";
import callApi from "../httpClientWrapper/callApi";
import bcrypt from "bcryptjs"

function LogIn(props) {
  const salt = bcrypt.genSaltSync(10)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [submitted, setSubmitted] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const [cookie, setCookie] = React.useState("");

  function handleValidation(event) {
    const password = values.password
    const hashedPassword = bcrypt.hashSync(password, '$2a$10$CwTycUXWue0Thq9StjUM0u')
    const loginData = {
      endPoint: "login",
      method: "POST",
      body: JSON.stringify({
        email: values.email,
        password: hashedPassword,
      }),
    };
    callApi(loginData)
      .then((userData) => {
        document.cookie = `loginToken=${userData.token}`;
        dispatch(loginAction(userData));
        if (document.cookie != null) {
          setCookie(document.cookie);
        } else {
          setCookie("");
        }
      })
      .catch(function (err) {
        console.log("----", err);
      });
  }

  function loginForm() {
    return (
      <div className="box">
        <form className="form" onSubmit={handleSubmit}>
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
          {errors.email && <pre style={{ color: "red" }}>{errors.email}</pre>}
          <br></br>
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
          {/* <input className="submit" type="submit" value="User Registration" onClick={handleRequest}></input> */}
          <input
            className="login"
            type="submit"
            value="LogIn"
            onClick={handleValidation}
          ></input>
        </form>
      </div>
    );
  }

  function handleChangeEmail(event) {
    setValues({ ...values, email: event.target.value });
  }

  function handleChangePassword(event) {
    setValues({ ...values, password: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (
      !values.firstName ||
      !values.lastName ||
      !values.password ||
      !values.email
    ) {
      setErrors(Validation(values));
    } else {
      setSubmitted(true);
    }
  }

  return (
    <>
      <pre className="submitmsg">
        {" "}
        {submitted ? (
          <h2>"Hello {values.firstName} You have registered"</h2>
        ) : (
          ""
        )}{" "}
      </pre>
      {loginForm()}
      {cookie ? navigate("/market-place") : ""}
    </>
  );
}

export default LogIn;
