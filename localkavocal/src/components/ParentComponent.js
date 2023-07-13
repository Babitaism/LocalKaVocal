import React from "react";
import Routing from "./Routing";
import Navbar from "./Navbar";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

function ParentComponent() {
const store = useSelector((state) => state);

  function rishu(name) {
    console.log(name, "name");
  }

  return (
    <div>
      {/* <UserProvider value={this.user}> */}
      <Navbar />
      <Routing rishu={rishu} />
      {/* </UserProvider> */}
    </div>
  );
}

export default ParentComponent;
