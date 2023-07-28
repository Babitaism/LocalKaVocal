import { loggedin } from "../actionTypes/actiontype"

export default function loginReducer(state = {  }, action) {
  // console.log('login reducer')
      switch (action.type) {
        case loggedin:
          return { value: action.payload }
        default:
          return state
      }
    }