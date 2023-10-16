import { deleteuser } from "../actionTypes/actiontype"


export default function deleteUserIdReducer(state = {  }, action) {
    // console.log(action,"address reducer called")
      switch (action.type) {
        case deleteuser:
          return { value: action.payload }
        default:
          return state
      }
    }
