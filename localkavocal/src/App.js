import React from "react";
import { Provider } from 'react-redux'
import ParentComponent from "./components/ParentComponent"
import store from "./store/store";

function App() {
  return (
    <>
    <ParentComponent/>    
    </> 
  );
}

export default App;
