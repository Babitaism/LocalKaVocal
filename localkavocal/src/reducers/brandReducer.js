import { findBrand } from "../actionTypes/actiontype"


export default function brandReducer(state = {  }, action) {
    // console.log(action,"brand reducer called")
      switch (action.type) {
        case findBrand:
          return { value: action.payload }
        default:
          return state
      }
    }