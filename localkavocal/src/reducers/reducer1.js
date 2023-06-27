import { authentication } from "../actionTypes/actiontype"

export default function authenticReducer(state = { value: 0 }, action) {
    console.log('ppppppppppppppppauthentic', action)
      switch (action.type) {
        case authentication:
          return { value: action.payload }
        default:
          return {}
      }
    }