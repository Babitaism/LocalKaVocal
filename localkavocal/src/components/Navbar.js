import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { remove } from "react-cookie";
import { useSelector } from "react-redux";
import callApi from "../httpClientWrapper/callApi";
import { useDispatch } from "react-redux";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { autocompleteAction } from "../actions/autocompleteAction";
import { brandAction } from "../actions/brandAction";
import { Link } from "react-router-dom";



function FreeSoloCreateOption() {
  const dispatch = useDispatch();

  let brands = [];

  const store = useSelector((state) => state);

  function searchItems(event) {
    let value = event.target.value;
    console.log(value,"valueauto")
    searchbyBrand(value);
  }

  function searchItems1(event) {
    let value = event.target.innerText;
    console.log(value,"valuesearch1")
    fetchProductInfo(value)
  }

  const  fetchProductInfo = (value) => {
    console.log(value,"value")
    const searchForImages = {
      endPoint: `fetchProductInfo/?item=${value}`,
      method: "GET",
    };
    callApi(searchForImages)
      .then((brand) => {
        console.log(brand, "response");
        dispatch(brandAction(brand));
      })
      .catch(function (err) {
        console.log("----", err);
      });
  };

  const searchbyBrand = (value) => {
    const searchData = {
      endPoint: `searchItems/?item=${value}`,
      method: "GET",
    };

    callApi(searchData)
      .then((brand) => {
        dispatch(autocompleteAction(brand));
      })
      .catch(function (err) {
        console.log("--err--", err);
      });
  };

  if (
    store.hasOwnProperty("autocompleteReducer") &&
    store.autocompleteReducer &&
    store.autocompleteReducer.value
  ) {
    brands = store.autocompleteReducer.value.data.message;
  }
  return (
    <Autocomplete
      onInputChange={(e) => searchItems(e)}
       onChange={(e) => searchItems1(e)}
      id="free-solo-with-text-demo"
      options={brands.map((option) => option.title)}
      sx={{ width: 300 }}
      freeSolo
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search.."
          InputProps={{
            ...params.InputProps,
            type: "search",
          }}
        />
      )}
    />
  );
}

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const store = useSelector((state) => state);
  const isMenuOpen = Boolean(anchorEl);
  const showSearch = React.useRef(false);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    document.cookie =
      "username=loginToken; expires=Thu, 01 Jan 1970 12:00:00 UTC; path=/dashboard;";
    remove(document.cookie);
    // console.log(document.cookie, "coo");
    window.location.replace("/login");
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  function toProfile(){
    window.location.replace("/user-addresses")
  };

  function handleWishlist(){
    window.location.replace("/wishlist")
  };


  function handleCart(){
    window.location.replace("/cart")
  };

  const showSearchMenu = () => {
    // console.log("store", store)
    if (
      store &&
      store.hasOwnProperty("loginReducer") &&
      store.loginReducer.value &&
      store.loginReducer.value.isUserLoggedIn
    ) {
      showSearch.current = true;
    }
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={toProfile}>Profile</MenuItem>
      <MenuItem onClick={handleWishlist}>Wishlist</MenuItem>
      <MenuItem onClick={handleCart}>Cart</MenuItem>
      <MenuItem onClick={handleLogout}>LogOut</MenuItem>

    </Menu>
  );

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <MenuIcon />
            {showSearchMenu()}
            {showSearch.current && <FreeSoloCreateOption />}
            <Box sx={{ flexGrow: 1 }} />
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Toolbar>
        </AppBar>

          {/* store &&
          store.hasOwnProperty("loginReducer") &&
          store.loginReducer.value &&
          store.loginReducer.value.isUserLoggedIn && */}
          {renderMenu}
      </Box>
    </div>
  );
}
