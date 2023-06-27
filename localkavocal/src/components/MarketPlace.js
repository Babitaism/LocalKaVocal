import { useEffect, useState } from "react";
import React from "react";
import { SERVER_END_POINT } from "../configs/configuration";
import { useSelector, useDispatch } from "react-redux";
import cookie from "react-cookie";
import { useNavigate } from "react-router-dom";
import { loginAction } from "../actions/action";

function MarketPlace() {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const [data, setData] = useState("");
  let isUserLoggedIn = "";
  if (store.hasOwnProperty("value") && store.value) {
    isUserLoggedIn = store.value.isUserLoggedIn;
  }
  const [isLoggedin, setIsLoggedin] = useState(isUserLoggedIn);
  const navigate = useNavigate();

  const getUserData = () => {
    fetch(`${SERVER_END_POINT}/getUserDetail`, {
      method: "POST",
      body: JSON.stringify({
        msg: "Babita Rawat",
      }),
      headers: {
        "Content-type": "application/json",
        token: cookie.load("loginToken"),
      },
    })
      .then((response) => response.json())
      .then((resp) => {
        document.cookie = `loginToken=${resp.token}`;
        console.log(resp);
        let name = resp.userName;
        console.log(resp.userName, "name");
        if (resp.status == 200) {
          setData(name);
          setIsLoggedin(true);
          dispatch(loginAction(resp));
        } else {
          // console.log('getUserData else')
          setIsLoggedin(false);
          console.log(resp);
        }
      })
      .catch(function (err) {
        console.log("----", err);
      });
  };

  useEffect(() => {
    // console.log('useEffect')
    getUserData();
  }, []);

  const printDashboard = () => {
    // console.log('printDashboard', isLoggedin )
    if (isUserLoggedIn === true) {
      return <p>Hi {data}</p>;
    } else {
      navigate("/login");
    }
  };

  return <>{printDashboard()}</>;
}

export default MarketPlace;
