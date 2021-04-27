import React from "react";
import "./index.css";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import firebase from "firebase/app";
import MenuIcon from "@material-ui/icons/Menu";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    marginRight: "auto",
  },
  drawer: {
    width: 300,
  },
  content: {
    padding: theme.spacing(3),
  },
}));

const DashboardHeader = ({ setOpen }) => {
  const classes = useStyles();
  let history = useHistory();
  
  const handleLogOut = async () => {
    await firebase.auth().signOut();
    history.push("/");
  };

  return (
    <>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <MenuIcon
            style={{ cursor: "pointer" }}
            className={classes.menuButton}
            fontSize="large"
            onClick={setOpen}
          >
            <MenuIcon />
          </MenuIcon>
          <Typography variant="h6" className={classes.title}>
            Parking Booking System
          </Typography>
          <Button
            style={{ backgroundColor: "#b3b3b3" }}
            onClick={handleLogOut}
            type="submit"
            variant="outlined"
          >
            Log Out
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default DashboardHeader;
