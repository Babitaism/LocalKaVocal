import React from "react";
import Routing from "./Routing";
import Navbar from "./Navbar";
import Snackbar from './SnackBar';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

// import { Snackbar } from "@mui/material";
// import SimpleSnackbar from "./SnackBar";

function ParentComponent() {
  const store = useSelector((state) => state);
  let openSnackBar = false;
  
  if(store.hasOwnProperty('value') && store.value){
    openSnackBar = store.value.isUserLoggedIn
    console.log('-----------', openSnackBar)
  }
  const [open, setOpen] = useState(openSnackBar);

  function rishu(name) {
    console.log(name, "name");
  }
  console.log('----2-------', openSnackBar)

  return (
    <div>
      {/* <UserProvider value={this.user}> */}
      <Navbar />
      <Routing rishu={rishu} />
      <Snackbar x={openSnackBar}/>
      {/* </UserProvider> */}
    </div>
  );
}

export default ParentComponent;
