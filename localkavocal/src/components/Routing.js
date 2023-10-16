import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LogIn from "./LogIn";
import NoPage from "./NoPage";
import SignUp from "./SignUp";
import MarketPlace from "./MarketPlace";
import routing from "../configs/routing";
import UserAddresses from "./UserAddresses";
import Wishlist from "./Wishlist";
import EditAddress from "./EditAddress";
import CardComponent from "./cardComponent";
import AddAddress from "./AddAddress";

function RoutingComponent(props) {

  function allRoutes() {
    let routeArr = [];
    for (let i in routing) {
      let component = routing[i].component;
      routeArr.push(
        <Route key={"routing" + i} path={routing[i].path} element={component} />
      );
    }
    routeArr.push(
      <Route key={"xyz-localkavocal"} path="/" element={<SignUp />} />,
      <Route key={"xyz-localkavocal"} path="/login" element={<LogIn />} />,
      <Route key={"xyz-localkavocal"} path="/user-addresses" element={<UserAddresses />} />,
      <Route key={"xyz-localkavocal"} path="/addAddress" element={<AddAddress />} />,
      <Route key={"xyz-localkavocal"} path="/editaddress" element={<EditAddress />}/>,
      <Route key={"xyz-localkavocal"} path="/cardcomponent" element={<CardComponent />}/>,
      <Route key={"xyz-localkavocal"} path="/wishlist" element={<Wishlist />}/>,
      <Route key={"xyz-localkavocal"} path="/market-place" element={<MarketPlace />}/>,
      <Route key={"xyz-localkavocal"} path="*" element={<NoPage />} />
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
