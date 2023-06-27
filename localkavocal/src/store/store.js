import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../reducers/reducer";


const store = configureStore({
  reducer: loginReducer, 
});


export default store;
