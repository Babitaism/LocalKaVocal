import React from "react";
import { useSelector, useDispatch } from "react-redux";
import callApi from "../httpClientWrapper/callApi";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { loginAction } from "../actions/action";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Container from "react-bootstrap/Container";
import { DEFAULT_COUNT, IMAGE_PER_ROW, PRODUCT_PER_PAGE } from "../configs/configuration";
import { SERVER_END_POINT } from "../configs/configuration";
import { useNavigate } from "react-router-dom";

function Wishlist() {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const [data, setData] = useState("");
  let isUserLoggedIn = "";
  let allBrands = "";

  const printItemCards = (resp) => {
    let msg = resp.message;
    let blankArray = [];
    let temp = [];
    let flag = 0;
    let count = 0;
    for (let i = 0; i < msg.length; i++) {
      let path = msg[i].ProductImage;
      let product = msg[i].ProductName;
      temp.push(
        <Card sx={{ maxWidth: 190 }} className="margin-right col-4 boxsize"  key={`class${i}`}  >
          <CardActionArea key={`card${i}`}>
            <CardMedia key={`cardmedia${i}`}
              component="img"
              height="160"
              image={`${SERVER_END_POINT}/getImage?path=${path}`}
              alt={product}
            /><br></br>
            <CardContent key={`cl${i}`}>
              <Typography
                gutterBottom
                variant="h7"
                component="div"
                key={`typo${i}`}
              >
               {msg[i].ProductSpecification} {product}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <b>Rs.{msg[i].ProductPerPrice}</b>
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      );

      flag += 1;
      count += 1;
      if (flag === IMAGE_PER_ROW) {
        blankArray.push(
          <div key={`di${i}`}>
            <div className="row" >
              {temp}
            </div>
            <hr />
          </div>
        );
        flag = 0;
        temp = [];
      }
      if (
        (flag === IMAGE_PER_ROW - 2 && count === msg.length) ||
        (flag === IMAGE_PER_ROW - 1 && count === msg.length) ||
        (flag === IMAGE_PER_ROW - 3 && count === msg.length)
      ) {
        blankArray.push(
          <div>
            <div className="row" key={`row${i}`}>
              {temp}
            </div>
            <hr />
          </div>
        );
        flag = 0;
        temp = [];
      }
    }
    allBrands = blankArray;
  };

  if (
    store.hasOwnProperty("loginReducer") &&
    store.loginReducer &&
    store.loginReducer.value
  ) {
    isUserLoggedIn = store.loginReducer.value.isUserLoggedIn;
  }

  if (
    store.hasOwnProperty("loginReducer") &&
    store.loginReducer &&
    store.loginReducer.value
  ) {
    allBrands = store.loginReducer.value.data;
    printItemCards(allBrands);
  }

  const [isLoggedin, setIsLoggedin] = useState(isUserLoggedIn);

  const getUserData = () => {
    const fetchwishlistdata = {
      endPoint: "getWishlistItems",
      method: "POST",
      body: JSON.stringify({
        msg: "Fetch Wishlist Items",
      }),
    };
    callApi(fetchwishlistdata)
      .then((resp) => {
        if (resp) {
          dispatch(loginAction(resp));
          setIsLoggedin(true);
        } else {
          setIsLoggedin(false);
        }
      })
      .catch(function (err) {
        console.log("----", err);
      });
  };


  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
    <br></br>
    <p>Your Wishlist Items</p>
    <Container className="container-fluid">{allBrands}</Container>
    <Link className="link" to="/market-place">
        Back
      </Link>
  </>
  );
}

export default Wishlist;
