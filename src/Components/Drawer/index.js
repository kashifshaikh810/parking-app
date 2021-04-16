import React, { useState, useEffect } from "react";
import DashboardHeader from "../DashboardHeader/index";
import { Drawer, List, ListItem, ListItemText } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import firebase from "firebase/app";

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 200,
  },
  item: {
    borderBottom: "1px solid #b3b3b3",
    paddingBottom: "13px",
    marginTop: "4vh",
    fontVariantCaps: "small-caps",
    fontWeight: "bold",
    color: "#b3b3b3",
  },
}));

const DrawerHome = () => {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [adminRoll, setAdminRoll] = useState("");
  const classes = useStyles();

  const getAdminRoll = () => {
    let uid = firebase.auth()?.currentUser?.uid;
    firebase
      .database()
      .ref(`/newUser/${uid}`)
      .on("value", (snapshot) => {
        let data = snapshot.val() ? Object.values(snapshot.val()) : [];
        setAdminRoll(data[0]);
      });
  };

  useEffect(() => {
    getAdminRoll();
  }, [history]);

  const parkingHandler = () => {
    history.push("/bookparking");
    setOpen(false);
  };

  const bookHandler = () => {
    history.push("/viewbooking");
    setOpen(false);
  };

  const feedHandler = () => {
    history.push("/feedback");
    setOpen(false);
  };

  const viewUsersHandler = () => {
    history.push("/viewusers");
    setOpen(false);
  };

  const handleLogOut = async () => {
    await firebase.auth().signOut();
    history.push("/");
  };

  return (
    <>
      <DashboardHeader setOpen={setOpen} />
      <Drawer open={open} onClose={() => setOpen(false)}>
        <List disablePadding className={classes.drawer}>
          {adminRoll !== "admin@mail.com" ? (
            <ListItem button>
              <ListItemText
                primary="Book Parking"
                onClick={parkingHandler}
                className={classes.item}
              />
            </ListItem>
          ) : (
            []
          )}

          <ListItem button>
            <ListItemText
              onClick={bookHandler}
              primary="View Booking"
              className={classes.item}
            />
          </ListItem>

          <ListItem button>
            <ListItemText
              onClick={feedHandler}
              primary="Feed Back"
              className={classes.item}
            />
          </ListItem>

          {adminRoll === "admin@mail.com" ? (
            <ListItem button>
              <ListItemText
                onClick={viewUsersHandler}
                primary="View Users"
                className={classes.item}
              />
            </ListItem>
          ) : (
            []
          )}
          <ListItem button>
            <ListItemText
              onClick={handleLogOut}
              primary="Log Out"
              className={classes.item}
            />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default DrawerHome;
