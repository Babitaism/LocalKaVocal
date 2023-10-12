import React, { useState } from "react";
import callApi from "../httpClientWrapper/callApi";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


function EditAddress() {

  const fillName = () =>{
    if (store.hasOwnProperty("editReducer") && store.editReducer &&
    store.editReducer.value && store.editReducer.value.data && store.editReducer.value.data.message){
      return store.editReducer.value.data.message[0].fullname
    }
  }

  const mobile =()=>{
    if (store.hasOwnProperty("editReducer") && store.editReducer &&
     store.editReducer.value && store.editReducer.value.data && store.editReducer.value.data.message) {
    return store.editReducer.value.data.message[0].mobile_number
  }
 }

 const pincode =()=>{
  if (store.hasOwnProperty("editReducer") && store.editReducer &&
   store.editReducer.value && store.editReducer.value.data && store.editReducer.value.data.message){
  return store.editReducer.value.data.message[0].pincode
}
}

 const address =()=>{
    if(store.hasOwnProperty("editReducer") && store.editReducer &&
     store.editReducer.value && store.editReducer.value.data && store.editReducer.value.data.message) {
    return store.editReducer.value.data.message[0].flat_no+store.editReducer.value.data.message[0].house_no
   }
 }

 const address1 =()=>{
  if (store.hasOwnProperty("editReducer") && store.editReducer &&
   store.editReducer.value && store.editReducer.value.data && store.editReducer.value.data.message){
   return store.editReducer.value.data.message[0].house_no
 }
}

const address2 =()=>{
  if (store.hasOwnProperty("editReducer") && store.editReducer &&
   store.editReducer.value && store.editReducer.value.data && store.editReducer.value.data.message){
   return store.editReducer.value.data.message[0].building
 }
}

const sector =()=>{
  if (store.hasOwnProperty("editReducer") && store.editReducer &&
   store.editReducer.value && store.editReducer.value.data && store.editReducer.value.data.message){
   return store.editReducer.value.data.message[0].area_street_sector
 }
}

const landmark =()=>{
  if (store.hasOwnProperty("editReducer") && store.editReducer &&
   store.editReducer.value && store.editReducer.value.data && store.editReducer.value.data.message){
   return store.editReducer.value.data.message[0].landmark
 }
}

const city=()=>{
  if (store.hasOwnProperty("editReducer") && store.editReducer &&
   store.editReducer.value && store.editReducer.value.data && store.editReducer.value.data.message){
   return store.editReducer.value.data.message[0].town_city
 }
}

const state =()=>{
  if (store.hasOwnProperty("editReducer") && store.editReducer &&
   store.editReducer.value && store.editReducer.value.data && store.editReducer.value.data.message){
   return store.editReducer.value.data.message[0].state
 }
}

const userid = ()=>{
  if (store.hasOwnProperty("editReducer") && store.editReducer &&
  store.editReducer.value && store.editReducer.value.data && store.editReducer.value.data.message){
  return parseInt(store.editReducer.value.data.message[0].id)
}
}

  // const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const navigate = useNavigate()
  const [firstName, setFirstName] = React.useState(fillName());
  const [mobileNum, setMobileNum] = React.useState(mobile());
  const [editPincode, setEditPincode] = React.useState(pincode());
  const [editAddress, setEditAddress] = React.useState(address());
  const [editAddress1, setEditAddress1] = React.useState(address1());
  const [editAddress2, setEditAddress2] = React.useState(address2());
  const [editSector, setEditSector] = React.useState(sector());
  const [editLandmark, setEditLandmark] = React.useState(landmark());
  const [editCity, setEditCity] = React.useState(city());
  const [editState, setEditState] = React.useState(state());
  const [id, setId] = React.useState(userid());

 const handleChangeFname = (event) => {
  setFirstName(event.target.value);
};

const handleMobile = (event) => {
  setMobileNum(event.target.value);
};

const handlePincode = (event) => {
  setEditPincode(parseInt(event.target.value));
};

const handleAddress = (event) => {
  setEditAddress(event.target.value);
};

const handleAddress1 = (event) => {
  setEditAddress1(event.target.value);
};

const handleAddress2 = (event) => {
  setEditAddress2(event.target.value);
};

const handleSector = (event) => {
  setEditSector(event.target.value);
};

const handleLandmark = (event) => {
  setEditLandmark(event.target.value);
};

const handleCity = (event) => {
  setEditCity(event.target.value);
};

const handleState = (event) => {
  setEditState(event.target.value);
};


  function handleRequest(req) {
    const editAndAddData = {
      endPoint: "editAndAddUserDetails",
      method: "POST",
      body: JSON.stringify({
        firstName:firstName,
        mobileNum: mobileNum,
        editPincode:editPincode,
        editAddress:editAddress ,
        editAddress1: editAddress1,
        editAddress2: editAddress2,
        editSector:editSector,
        editLandmark: editLandmark,
        editCity:editCity,
        editState:editState,
        id:id
      }),
      headers: {
        "Content-type": "application/json",
      },
    };
    callApi(editAndAddData)
      .then((data) => {
        console.log(data,"addaddressdata")
      })
      .catch(function (err) {
        console.log("----", err);
      });
       navigate("/user-details")
  }

  return (
    <div className="editadress" >
      <label htmlFor="fullname" className="bold">
        Full name(First and Last Name)
      </label>
      <br></br>
      <input
        className="space"
        type="text"
        id="fullname"
        name="fullname"
        defaultValue={firstName}
        onChange = {handleChangeFname}
/>
      <br></br>
      <label htmlFor="mobile" className="bold">
        Mobile number
      </label>
      <br></br>
      <input
        className="space"
        type="number"
        id="mobile"
        name="mobile"
        defaultValue={mobile()}
        onChange= {handleMobile}
      />
      <br></br>
      <label htmlFor="pincode" className="bold">
        Pincode
      </label>
      <br></br>
      <input
        className="space"
        type="number"
        id="pincode"
        name="pincode"
        defaultValue={pincode()}
        onChange={handlePincode}
      />
      <br></br>
      <label htmlFor="address" className="bold">
        Flat, House no., Building,
      </label>
      <br></br>
      <input
        className="space"
        type="text"
        id="address"
        name="address"
        defaultValue={address()}
        onChange={handleAddress}
      />
      <br></br>
      <label htmlFor="address" className="bold">
        Company, Apartment
      </label>
      <br></br>
      <input
        className="space"
        type="text"
        id="address"
        name="address"
        defaultValue={address1()}
        onChange={handleAddress1}
      />
      <br></br>
       <label htmlFor="address" className="bold">
      Building, Area
      </label>
      <br></br>
      <input
        className="space"
        type="text"
        id="address"
        name="address"
        defaultValue={address2()}
        onChange={handleAddress2}
      />
      <br></br>
      <label htmlFor="sector" className="bold">
        Street, Sector, Village
      </label>
      <br></br>
      <input
        className="space"
        type="text"
        id="sector"
        name="sector"
        defaultValue={sector()}
        onChange={handleSector}
      />
      <br></br>
      <label htmlFor="landmark" className="bold">
        Landmark
      </label>
      <br></br>
      <input
        className="space"
        type="text"
        id="landmark"
        name="landmark"
        defaultValue={landmark()}
        onChange={handleLandmark}
      />
      <br></br>
      <label htmlFor="city" className="bold">
        Town/City
      </label>
      <br></br>
      <input
        className="space"
        type="text"
        id="city"
        name="city"
        defaultValue={city()}
        onChange={handleCity}
      />
      <br></br>
      <label htmlFor="state" className="bold">
        State
      </label>
      <br></br>
      <input
        className="space"
        type="text"
        id="state"
        name="state"
        defaultValue={state()}
        onChange={handleState}
      />
      <br></br>
      <br></br>
      <input
        type="radio"
        id="default"
        name="default"
        value="Make this my default address"
      />
      <span> Make this my default address</span>
      <br></br>
      <br></br>
      <input type="button" value="Save Changes" onClick={handleRequest} />
    </div>
  );
}

export default EditAddress;
