import { editAddress } from "../actionTypes/actiontype";

export const editAddressAction = (address) => {
    return {
      type: editAddress,
      payload: {
        BrandName: new Date().getTime(),
        data: address,
        isUserLoggedIn: true
      }
    };
  };
