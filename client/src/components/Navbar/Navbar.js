import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import * as React from "react";
// import memories from "../../assets/images/images.jpeg";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import groupomaniaLogo from "../../assets/images/Groupomania_Logos+(3)/icon-left-font-monochrome-black.svg";
import useStyles from "./styles";

import decode from "jwt-decode";
import { useAppSelector } from "../../store/hooks";
import { statusSelector, userSelector } from "../../store/selectors";

import { getOneUserThunk } from "../../redux/thunk";

const Navbar = () => {
  const classes = useStyles();
  const reduxUser = useAppSelector(userSelector);
  const status = useAppSelector(statusSelector);

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const history = useNavigate();
  const location = useLocation();

  useEffect(() => {
    dispatch(getOneUserThunk(reduxUser?.id));
  }, [status, dispatch, reduxUser]);

  const logout = React.useCallback(() => {
    // dispatch({ type: 'LOGOUT' })
    localStorage.clear();

    history("/");

    setUser(null);
  }, [history]);

  useEffect(() => {
    const token = user?.token;

    // Check JSON Web Token
    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location, logout, user]);

  return (
    <AppBar className={classes.appBar} position={"static"} color={"inherit"}>
      <div className={classes.brandContainer}>
        <Typography
          component={Link}
          to={"/"}
          className={classes.heading}
          variant={"h2"}
          align={"center"}
        >
          <img
            className={classes.image}
            src={groupomaniaLogo}
            alt={"memories"}
            height={"40"}
          />
        </Typography>
      </div>
      <div className={classes.navTitles}>
        <Typography
          component={Link}
          to={"/users/:id"}
          className={classes.heading}
          align={"center"}
        >
          Profile
        </Typography>
        <Typography
          component={Link}
          to={"/users"}
          className={classes.heading}
          align={"center"}
        >
          Admin
        </Typography>
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            {/**
                        <Avatar component={Link} to={'/users/:id'} className={classes.purple} alt={user?.result?.name} src={user?.result?.imageUrl} >
                            {user.result.name.charAt(0)}
                        </Avatar>
                        */}
            <Avatar
              component={Link}
              to={"/api/users/profile/:id"}
              className={classes.purple}
              alt={user.name}
            >
              {user.name}
            </Avatar>
            <Typography className={classes.userName} variant={"h6"}>
              {user.name /**user.result.name*/}
            </Typography>
            <Button
              variant={"contained"}
              onClick={logout}
              className={classes.logout}
              color={"secondary"}
            >
              Sign Out
            </Button>
          </div>
        ) : (
          <Button component={Link} to={"/auth"}>
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
