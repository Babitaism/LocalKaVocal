import { loggedin } from "../actionTypes/actiontype";

export const loginAction = (userInfo) => {
    return {
      type: loggedin,
      payload: {
        loggedInAt: new Date().getTime(),
        data: userInfo,
        isUserLoggedIn: true
      }
    };
  };