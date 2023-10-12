import { addAddress } from "../actionTypes/actiontype";

export const addAddressAction = (userDetails) => {
    return {
      type: addAddress,
      payload: {
        loggedInAt: new Date().getTime(),
        data: userDetails,
        isUserLoggedIn: true
      }
    };
  };
