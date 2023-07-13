import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import React from "react";
import Validation from "./Validation";
import { useDispatch } from "react-redux";
import { loginAction } from "../actions/action";
import { tokenAction } from "../actions/tokenAction";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import callApi from "../httpClientWrapper/callApi";

function LogIn(props) {
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
  const [open, setOpen] = React.useState(false);

  function handleValidation(event) {
    const loginData = {
      endPoint: "login",
      method: "POST",
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
    };
    callApi(loginData)
      .then((response) => response.json())
      .then((userData) => {
        console.log(userData, "login");
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
