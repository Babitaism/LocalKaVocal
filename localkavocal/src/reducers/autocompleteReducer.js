import { searchBrand } from "../actionTypes/actiontype"


export default function autocompleteReducer(state = {  }, action) {
    // console.log(action,"auto reducer called")
      switch (action.type) {
        case searchBrand:
          return { value: action.payload }
        default:
          return state
      }
    }
