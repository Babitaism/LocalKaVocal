import React from "react";
import { Link } from "react-router-dom";
import callApi from "../httpClientWrapper/callApi";
import { useEffect, useState } from "react";
import CardComponent from "./cardComponent";

function UserAddresses() {
  const [address, setaddress] = useState("");

  const getUserDetails = () => {
    const userDetailsData = {
      endPoint: "user-details",
      method: "POST",
      body: JSON.stringify({
        msg: "Babita Rawat",
      })
    };

    callApi(userDetailsData)
      .then((resp) => {
         setaddress(resp.message)
      })
      .catch(function (err) {
        console.log("----", err);
      });
  };

  // const temp = (argument)=>{
  //   console.log(argument,"aaaaaaaaaaaaaaaaaaaaaaa")
  //    const updatedAddress = address.filter((t)=> {
  //     return t.id != argument
  //    })
  //    setaddress(updatedAddress)
  // }

  const printAddresses = () => {
    let addresses = [ <div className="card address" key ={`abcd`} >
    <Link className="addaddress" style={{ textDecoration: "none" }} to="/addAddress">
         Add Address
       </Link>
   </div>]
    let blankArr=[]
    for(let i=0; i<address.length ; i++){
      addresses.push(
      <CardComponent key={`ab${i}`} id ={address[i].id} fullname={address[i].fullname} mobile ={address[i].mobile_number}
        address = {address[i].flat_no+" "+address[i].house_no+" "+address[i].building+" "+address[i].area_street_sector}
         city={address[i].landmark+" "+address[i].pincode}
         state ={address[i].town_city+" "+address[i].state}
        //  callback={temp}
      />)
    }

      blankArr.push(
        <div key = {`de`}>
          <h3>Your Addresses</h3>
          <div className="row" >
           {addresses}
          </div>
          <hr />
        </div>
      );
     return blankArr
   }

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className="container">
      {printAddresses()}
      <br></br>
      <Link className="link" to="/market-place">
        Back
      </Link>
    </div>
  );
}

export default UserAddresses;
