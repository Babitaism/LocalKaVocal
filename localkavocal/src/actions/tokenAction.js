import { authentication } from "../actionTypes/actiontype";

export const tokenAction = (userInfo) => {
    console.log('----------------token action called', userInfo)
    return {
      type: authentication ,
      payload: {
        loggedInAt: new Date().getTime(),
        data: userInfo,
      }
    };
  };