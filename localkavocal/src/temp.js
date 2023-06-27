// //actions
// export const loginAction = (userInfo) => {
//     console.log('----------------login action called', userInfo)
//     return {
//       type: "LOGIN",
//       payload: {
//         loggedInAt: new Date().getTime(),
//         data: userInfo,
//       }
//     };
//   };

// //reducers
// export default function loginReducer(state = { value: 0 }, action) {
//     console.log('pppppppppppppppp', action)
//       switch (action.type) {
//         case 'LOGIN':
//           return { value: action.payload }
//         default:
//           return {}
//       }
//     }
