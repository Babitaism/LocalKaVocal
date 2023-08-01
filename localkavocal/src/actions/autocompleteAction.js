import { searchBrand } from "../actionTypes/actiontype";

export const autocompleteAction = (brand) => {
    console.log('------------autocomplete action called', brand)
    return {
      type: searchBrand,
      payload: {
        BrandName: new Date().getTime(),
        data: brand,
      }
    };
  };