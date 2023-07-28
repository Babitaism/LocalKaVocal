import { useEffect, useState } from "react";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginAction } from "../actions/action";
import callApi from "../httpClientWrapper/callApi";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Container from "react-bootstrap/Container";
import { IMAGE_PER_ROW } from "../configs/configuration";
import { SERVER_END_POINT } from "../configs/configuration";
import { brandAction } from "../actions/brandAction";
import { Breadcrumb } from "react-bootstrap";
import CustomSeparator from "./Breadcrumbs";

function MarketPlace() {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const [data, setData] = useState("");
  let isUserLoggedIn = "";
  let allBrands = "";

  const printItemCards = (resp) => {
    let msg = resp.message;
    let blankArr = [];
    let temp = [];
    let flag = 0;
    let count = 0;
    for (let i = 0; i < msg.length; i++) {
      let path = msg[i].ProductImage ;
      let product = msg[i].ProductName
      temp.push(
        <Card sx={{ maxWidth: 190 }} key={i} className="margin-right col-4 boxsize">
          <CardActionArea key={`a${i}`}  >
            <CardMedia
              key={`b${i}`}
              component="img"
              height="160"
              image= {`${SERVER_END_POINT}/getImage?path=${path}`}
              alt={product}
            />
            <CardContent  >
              <Typography
                gutterBottom
                variant="h7"
                component="div"
                key={`c${i}`}
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
        blankArr.push(
          <div >
            <div className="row" key={`d${i}`}>
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
        blankArr.push(
          <div >
            <div className="row" key={`e${i}`}>
              {temp }
            </div>
            <hr />
          </div>
        );
        flag = 0;
        temp = [];
      }
    }
    allBrands = blankArr;
  };

  if (
    store.hasOwnProperty("loginReducer") &&
    store.loginReducer &&
    store.loginReducer.value
  ) {
    isUserLoggedIn = store.loginReducer.value.isUserLoggedIn;
  }

  if (
    store.hasOwnProperty("brandReducer") &&
    store.brandReducer &&
    store.brandReducer.value
  ) {
    allBrands = store.brandReducer.value.data;
    printItemCards(allBrands);
  }

  const [isLoggedin, setIsLoggedin] = useState(isUserLoggedIn);

  const getUserData = () => {
    const marketPlaceData = {
      endPoint: "getUserDetail",
      method: "POST",
      body: JSON.stringify({
        msg: "Babita Rawat",
      }),
    };

    callApi(marketPlaceData)
      .then((resp) => {
        document.cookie = `loginToken=${resp.token}`;
        let name = resp.userName;
        // console.log(resp.userName, "name");
        if (resp.status === 200) {
          setData(name);
          setIsLoggedin(true);
          dispatch(loginAction(resp));
        } else {
          setIsLoggedin(false);
        }
      })
      .catch(function (err) {
        console.log("----", err);
      });
  };

  const getItem = () => {
    const getProductsParams = {
      endPoint: "products",
      method: "POST",
    };
    callApi(getProductsParams).then((resp) => {
      dispatch(brandAction(resp));
    });
  };

  useEffect(() => {
    getUserData();
    getItem();
  }, []);

  return (
    <>
     <CustomSeparator/>
    <br></br>
      <p>Hi {data}</p>
      <Container className="container-fluid">{allBrands}</Container>
    </>
  );
}

export default MarketPlace;
