import { editAddress } from "../actionTypes/actiontype"


export default function editReducer(state = {  }, action) {
    // console.log(action,"edit reducer called")
      switch (action.type) {
        case editAddress:
          return { value: action.payload }
        default:
          return state
      }
    }
