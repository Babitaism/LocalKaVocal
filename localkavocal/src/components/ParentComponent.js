import React from "react";
import Routing from "./Routing";
import Navbar from "./Navbar";
// import { useSelector } from "react-redux";


function ParentComponent() {
// const store = useSelector((state) => state);

  return (
    <div>
      <Navbar />
      <Routing />
    </div>
  );
}

export default ParentComponent;
