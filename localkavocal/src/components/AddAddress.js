import React from "react";
import callApi from "../httpClientWrapper/callApi";
// import { addAddressAction } from "../actions/addAddress";
// import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function AddAddress() {
  // const dispatch = useDispatch();
  const navigate = useNavigate()
  const [firstName, setFirstName] = React.useState("");
  const [mobile, setMobile] = React.useState("");
  const [pincode, setPincode] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [address1, setAddress1] = React.useState("");
  const [address2, setAddress2] = React.useState("");
  const [sector, setSector] = React.useState("");
  const [landmark, setLandmark] = React.useState("");
  const [city, setCity] = React.useState("");
  const [state, setState] = React.useState("");

  const handleChangeFname = (event) => {
    setFirstName(event.target.value);
  };

  const handleMobile = (event) => {
    setMobile(event.target.value);
  };

  const handlePincode = (event) => {
    setPincode(event.target.value);
  };

  const handleAddress = (event) => {
    setAddress(event.target.value);
  };

  const handleAddress1 = (event) => {
    setAddress1(event.target.value);
  };

  const handleAddress2 = (event) => {
    setAddress2(event.target.value);
  };

  const handleSector = (event) => {
    setSector(event.target.value);
  };

  const handleLandmark = (event) => {
    setLandmark(event.target.value);
  };

  const handleCity = (event) => {
    setCity(event.target.value);
  };

  const handleState = (event) => {
    setState(event.target.value);
  };

  function handleRequest(req) {
    const addData = {
      endPoint: "addUserDetails",
      method: "POST",
      body: JSON.stringify({
        firstName: firstName,
        mobile: mobile,
        pincode: pincode,
        address: address,
        address1: address1,
        address2: address2,
        sector: sector,
        landmark: landmark,
        city: city,
        state: state,
      }),
      headers: {
        "Content-type": "application/json",
      },
    };
    callApi(addData)
      .then((data) => {
        navigate("/user-addresses")
      })
      .catch(function (err) {
        console.log("----", err);
      });

  }

  return (
    <div className="editadress">
      <label htmlFor="fullname" className="bold">
        Full name(First and Last Name)
      </label>
      <br></br>
      <input
        className="space"
        type="text"
        id="fullname"
        name="fullname"
        value={firstName}
        onChange={handleChangeFname}
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
        value={mobile}
        onChange={handleMobile}
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
        value={pincode}
        onChange={handlePincode}
      />
      <br></br>
      <label htmlFor="address" className="bold">
        Flat, House no., Building
      </label>
      <br></br>
      <input
        className="space"
        type="text"
        id="address"
        name="address"
        value={address}
        onChange={handleAddress}
      />
      <br></br>
      <label htmlFor="address1" className="bold">
      Company, Apartment
      </label>
      <br></br>
      <input
       className="space"
        type="text"
        id="address1"
        name="address1"
        value={address1}
        onChange={handleAddress1}
      />
      <br></br>
      <label htmlFor="address2" className="bold">
      Building, Area
      </label>
      <br></br>
      <input
        className="space"
        type="text"
        id="address2"
        name="address2"
        value={address2}
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
        value={sector}
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
        value={landmark}
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
        value={city}
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
        value={state}
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

export default AddAddress;
