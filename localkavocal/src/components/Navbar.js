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
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { autocompleteAction } from "../actions/autocompleteAction";

const filter = createFilterOptions();
function FreeSoloCreateOption() {
  const dispatch = useDispatch();
  let brands;
  const [value, setValue] = React.useState(null);
  const store = useSelector((state) => state);

  function searchItems(event) {
    let value = event.target.value;
    console.log(value, "vvvvvvvvvvv");
    searchbyBrand(value);
  }

  const searchbyBrand = (value) => {
    const searchData = {
      endPoint: `searchItems/?item=${value}`,
      method: "GET",
    };

    callApi(searchData)
      .then((brand) => {
        console.log(brand, "response");
        dispatch(autocompleteAction(brand));
      })
      .catch(function (err) {
        console.log("----", err);
      });
  };

  if (
    store.hasOwnProperty("autocompleteReducer") &&
    store.autocompleteReducer &&
    store.autocompleteReducer.value
  ) {
    console.log("hiiiiiiiiii");
    brands = store.autocompleteReducer.value.data.message;
    console.log(brands, "brrrr");
  }

  //  onInputChange={(e) => searchItems(e)}
  return (
    <Autocomplete
      value={value}
      onInputChange={(e) => searchItems(e)}
      
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="free-solo-with-text-demo"
      options={[]}
      
      renderOption={(props, option) => <li {...props}>{option.title}</li>}
      sx={{ width: 300 }}
      freeSolo
      renderInput={(params) => (
        <TextField {...params} label="Free solo with text demo" />
      )}
    />
  );
}

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const store = useSelector((state) => state);
  const isMenuOpen = Boolean(anchorEl);

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
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleLogout}>LogOut</MenuItem>
    </Menu>
  );

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <MenuIcon />
            <FreeSoloCreateOption />
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
        {store &&
          store.hasOwnProperty("value") &&
          store.value &&
          store.value.hasOwnProperty("isUserLoggedIn") &&
          store.value.isUserLoggedIn &&
          renderMenu}
        {renderMenu}
      </Box>
    </div>
  );
}
