import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../reducers/loginReducer";
import brandReducer from "../reducers/brandReducer";
import autocompleteReducer from "../reducers/autocompleteReducer"
import addAddressReducer from "../reducers/addAddressReducer";
import editReducer from "../reducers/editReducer";
import deleteUserIdReducer from "../reducers/deleteUserIdReducer";

const store = configureStore({
  reducer: {loginReducer,brandReducer,autocompleteReducer,addAddressReducer,editReducer,deleteUserIdReducer}
});


export default store;
