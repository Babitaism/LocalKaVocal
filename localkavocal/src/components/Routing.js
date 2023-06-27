import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LogIn from "./LogIn";
import NoPage from "./NoPage";
import SignUp from "./SignUp";
import MarketPlace  from "./MarketPlace"
import routing from "../configs/routing";
import { useState } from "react";

function RoutingComponent(props) {
const[userName,setUserName] = useState("")

function babita(data){
setUserName(data)
console.log(userName,"data")
props.rishu(userName)
}

  function allRoutes() {
    // console.log("-===========---", props);
    let routeArr = [];
    for (let i in routing) {
      let component = routing[i].component;
      routeArr.push(
        <Route
          key={"routing" + i}
          path={routing[i].path}
          element={component}
        />
      );
    }
    routeArr.push(
        <Route
        key={"xyz-localkavocal"}
        path="/"
        element={<SignUp babita = {babita}/>}
      />,
      <Route
        key={"xyz-localkavocal"}
        path="/login"
        element={<LogIn/>}
      />,
       <Route
       key={"xyz-localkavocal"}
       path="/market-place"
       element={<MarketPlace name = {userName}/>}
     />,
      <Route
      key={"xyz-localkavocal"}
      path="*"
      element={<NoPage/>}
    />,
    );
    return routeArr;
  }

    return (
      <>
        <BrowserRouter>
          <Routes>{allRoutes()}</Routes>
        </BrowserRouter>
      </>
    );
}

export default RoutingComponent;