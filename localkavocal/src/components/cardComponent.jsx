import React from "react";
import { useNavigate } from "react-router-dom";
import callApi from "../httpClientWrapper/callApi";
import { editAddressAction } from "../actions/editAddressAction";
import { useDispatch } from "react-redux";
import PositionedSnackbar from "./Snackbar";
import { deleteUserIdAction } from "../actions/deleteUserIdAction";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function CardComponent(props) {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const navigate = useNavigate();
  const [msg, setMsg] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const test = (arg) => {
    console.log(arg, "arg");
    setOpen(arg);
    if (arg == false) {
      setMsg("");
    }
    console.log(open, "openinarg");
    console.log(msg, "msginarg");
  };

  const editAddress = (e) => {
    const editData = {
      endPoint: "editDetails",
      method: "POST",
      body: JSON.stringify({
        id: parseInt(e.target.value),
      }),
      headers: {
        "Content-type": "application/json",
      },
    };
    callApi(editData)
      .then((data) => {
        dispatch(editAddressAction(data));
        navigate("/editaddress");
      })
      .catch(function (err) {
        console.log("----", err);
      });
  };

  const deleteAddress = (e) => {
    const deleteData = {
      endPoint: "deleteDetails",
      method: "POST",
      body: JSON.stringify({
        id: parseInt(e.target.value),
      }),
      headers: {
        "Content-type": "application/json",
      },
    };
    callApi(deleteData)
      .then((data) => {
        if (data.message.serverStatus == 2) {
          console.log("hidelete");
          setOpen(true);
          setMsg("Deleted");
          // dispatch(deleteUserIdAction(data));
           window.location.replace("/user-addresses")
          // props.callback(e.target.value)
        }

        //you can also use below but here page will be loaded
        //  window.location.replace("/user-addresses")
      })
      .catch(function (err) {
        console.log("----", err);
      });
  };

//   useEffect(() => {
//     getUserId();
//   }, []);

// const getUserId =()=>{
//   if (
//     store.hasOwnProperty("deleteUserIdReducer") &&
//     store.deleteUserIdReducer &&
//     store.deleteUserIdReducer.value &&
//     store.deleteUserIdReducer.value.data &&
//     store.deleteUserIdReducer.value.data.id
//   ) {
//     let userId = store.deleteUserIdReducer.value.data.id.id;
//     props.callback(userId);
//     return userId
//   }
// }

  console.log(open, "open");
  console.log(msg, "msg");

  return (
    <>
      <div className="card">
        <br></br>
        <input
          readOnly
          className="name"
          type="text"
          id="fname"
          name="fname"
          value={props.fullname}
        />
        <input
          readOnly
          className="fullname"
          type="text"
          id="address"
          name="address"
          value={props.address}
        />
        <input
          readOnly
          className="fullname"
          type="text"
          id="city"
          name="city"
          value={props.city}
        />
        <input
          readOnly
          className="fullname"
          type="text"
          id="state"
          name="state"
          value={props.state}
        />
        <input
          readOnly
          className="fullname"
          type="number"
          id="phone"
          name="phone"
          value={props.mobile}
        />
        <br></br>
        <div className="button1">
          <button
            className="edit"
            onClick={(e) => editAddress(e)}
            type="button"
            value={props.id}
          >
            Edit
          </button>
          <button
            className="delete"
            onClick={(e) => deleteAddress(e)}
            type="button"
            value={props.id}
          >
            Delete
          </button>
          <PositionedSnackbar message={msg} open={open} test={test} />
        </div>
      </div>
    </>
  );
}

export default CardComponent;
