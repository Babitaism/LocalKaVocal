import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from "react";

export default function SimpleSnackbar(props) {

  console.log(props,"props")

  const [open,setOpen] = useState("true");

  console.log('-----open', open)
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
   setOpen(false);
  };

  // useEffect(() => {
  //   console.log('useEffect')
  //   setOpen("true");
  // }, []);

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  console.log(open,"open in render")
  return (
    <div>
      <Snackbar
        open={open}
        onClose={handleClose}
        message="Authentication successful"
        action={action}
      />
    </div>
  );
}