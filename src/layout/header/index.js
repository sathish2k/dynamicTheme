import { useState } from "react";
import { AppBar, Toolbar, IconButton, Typography, Fab } from "@mui/material";
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";
import axios from "axios";
import ThemeList from "./themeList";
import ProfileList from "./profileList";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/actions";

const Header = () => {
  const dispatch = useDispatch();
  const [headerObj, setState] = useState({
    profileEl: null,
    themeEl: null,
  });
  const openTheme = (event) => {
    setState({
      ...headerObj,
      themeEl: event.currentTarget,
    });
  };
  const closeThemeModal = () => {
    setState({
      ...headerObj,
      themeEl: null,
    });
  };
  const openProfile = (event) => {
    setState({
      ...headerObj,
      profileEl: event.currentTarget,
    });
  };
  const closeProfile = () => {
    setState({
      ...headerObj,
      profileEl: null,
    });
  };
  const logOut = () => {
    axios
      .post(
        process.env.REACT_APP_BASE_URL + "/api/logout",
        {},
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        dispatch(setUser(null));
      })
      .catch((err) => {
        console.log("failed to logout");
      });
  };
  const initials = (name) => {
    let nameArray = name.split(" ");
    let initials = "";
    if (nameArray.length === 1) {
      return nameArray[0].charAt(0) + "" + nameArray[0].charAt(1);
    } else {
      initials = nameArray[0].charAt(0);
    }
    for (let i = nameArray.length - 1; i < nameArray.length; i++) {
      initials += nameArray[i].charAt(0);
    }
    return initials.toUpperCase();
  };
  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flex: 1, display: "flex" }}
          >
            Theme App
          </Typography>
          <IconButton
            aria-controls="theme"
            aria-haspopup="true"
            onClick={openTheme}
            color="inherit"
            sx={{ marginLeft: "10px", marginRight: "10px" }}
          >
            <FormatColorFillIcon />
          </IconButton>
          <Fab
            size="small"
            color="secondary"
            aria-label="add"
            aria-controls="settings"
            aria-haspopup="true"
            onClick={openProfile}
            sx={{ marginLeft: "10px", marginRight: "10px" }}
          >
            {initials("sathish kumar")}
          </Fab>
          <ProfileList
            anchorEl={headerObj.profileEl}
            handleClose={closeProfile}
            logOut={() => logOut()}
          />
          <ThemeList handleClose={closeThemeModal} open={headerObj.themeEl} />
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default Header;
