import { addAddress } from "../actionTypes/actiontype"


export default function addAddressReducer(state = {  }, action) {
    // console.log(action,"address reducer called")
      switch (action.type) {
        case addAddress:
          return { value: action.payload }
        default:
          return state
      }
    }
