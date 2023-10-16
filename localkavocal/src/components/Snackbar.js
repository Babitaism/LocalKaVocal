import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';

export default function PositionedSnackbar(props) {
   console.log(props,"props");

    const [state, setState] = React.useState({
       vertical: 'top',
       horizontal: 'center',
    });
    const { vertical, horizontal } = state;


    const handleClose = () => {
      props.test(false)
    //  return
    };



    return (
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={props.open}
          message={props.message}
          autoHideDuration={3000}
          onClose={handleClose}
          key={vertical + horizontal}
        />

    );
  }


