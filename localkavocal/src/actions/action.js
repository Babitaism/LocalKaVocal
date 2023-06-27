import { TroubleshootRounded } from "@mui/icons-material";
import { loggedin } from "../actionTypes/actiontype";

export const loginAction = (userInfo) => {
    console.log('----------------login action called', userInfo)
    return {
      type: loggedin,
      payload: {
        loggedInAt: new Date().getTime(),
        data: userInfo,
        isUserLoggedIn: true
      }
    };
  };