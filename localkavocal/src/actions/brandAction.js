import { findBrand } from "../actionTypes/actiontype";

export const brandAction = (brand) => {
    return {
      type: findBrand,
      payload: {
        BrandName: new Date().getTime(),
        data: brand,
        isUserLoggedIn: true
      }
    };
  };
