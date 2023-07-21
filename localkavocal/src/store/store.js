import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../reducers/loginReducer";
import brandReducer from "../reducers/brandReducer";
import autocompleteReducer from "../reducers/autocompleteReducer"

const store = configureStore({
  reducer: {loginReducer,brandReducer,autocompleteReducer}
});


export default store;
