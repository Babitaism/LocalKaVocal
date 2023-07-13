import { useEffect, useState } from "react";
import React from "react";
// import { SERVER_END_POINT } from "../configs/configuration";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginAction } from "../actions/action";
import callApi from "../httpClientWrapper/callApi";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Container from "react-bootstrap/Container";

function MarketPlace() {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const [data, setData] = useState("");
  const [items, setItems] = useState([]);
  let isUserLoggedIn = "";
  if (store.hasOwnProperty("value") && store.value) {
    isUserLoggedIn = store.value.isUserLoggedIn;
  }
  const [isLoggedin, setIsLoggedin] = useState(isUserLoggedIn);
  const navigate = useNavigate();

  const getUserData = () => {
    const marketPlaceData = {
      endPoint: "getUserDetail",
      method: "POST",
      body: JSON.stringify({
        msg: "Babita Rawat",
      }),
    };
    callApi(marketPlaceData)
      .then((response) => response.json())
      .then((resp) => {
        document.cookie = `loginToken=${resp.token}`;
        console.log(resp);
        let name = resp.userName;
        console.log(resp.userName, "name");
        if (resp.status === 200) {
          setData(name);
          setIsLoggedin(true);
          dispatch(loginAction(resp));
        } else {
          setIsLoggedin(false);
          console.log(resp);
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
    callApi(getProductsParams)
      .then((response) => response.json())
      .then((resp) => {
        console.log(resp, "reso");
        printItemCards(resp);
      });
  };
  const printItemCards = (resp) => {
    let msg = resp.message;
    let blankArr = [];
    let temp = [];
    let flag = 0;
    let count=0
    console.log(msg, "respppppppppppppp");
    for (let i = 0; i < msg.length; i++) {
      let id = msg[i].ID;
      temp.push(
        <Card sx={{ maxWidth: 190 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="160"
              image={`http://localhost:4000/getTshirtImage/${id}`}
              alt="T-Shirt"
            />
            <CardContent>
              <Typography gutterBottom variant="h7" component="div">
                {msg[i].ProductSpecification} T-Shirt
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <b>Rs.{msg[i].ProductPerPrice}</b>
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      );
      flag += 1;
      count+=1
      if (flag == 3 ) {
        blankArr.push(<div className="row">{temp}</div>);
        flag = 0;
        temp = [];
      }
      console.log(flag,msg.length,i,"llll")
      if(flag==1 && count==msg.length ||flag==2 && count==msg.length ){
        blankArr.push(<div className="row">{temp}</div>);
        flag = 0;
        temp = [];
      }
    }
    console.log(blankArr, "ppppppppp");
    setItems(blankArr);
  };

  useEffect(() => {
    getUserData();
    getItem();
  }, []);

  const printDashboard = () => {
    if (isUserLoggedIn === true) {
      return <p>Hi {data}</p>;
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      {printDashboard()}
      <Container className="container-fluid">{items}</Container>
    </>
  );
}

export default MarketPlace;
