import { findBrand } from "../actionTypes/actiontype";

export const brandAction = (brand) => {
    console.log('----------------brand action called', brand)
    return {
      type: findBrand,
      payload: {
        BrandName: new Date().getTime(),
        data: brand,
      }
    };
  };