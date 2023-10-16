import { deleteuser } from "../actionTypes/actiontype";

export const deleteUserIdAction = (userId) => {
    return {
      type: deleteuser,
      payload: {
        loggedInAt: new Date().getTime(),
        data: userId,
        isUserLoggedIn: true
      }
    };
  };
