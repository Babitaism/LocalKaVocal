import { loggedin } from "../actionTypes/actiontype"

export default function loginReducer(state = { value: 0 }, action) {
      switch (action.type) {
        case loggedin:
          return { value: action.payload }
        default:
          return {}
      }
    }