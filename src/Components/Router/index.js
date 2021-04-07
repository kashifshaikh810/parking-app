import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import SignIn from "../Authentication/SignIn/index";
import SignUp from "../Authentication/Signup/index";
import firebase from "firebase/app";
import Drawer from "../Drawer/index";
import Dashboard from "../BookParking/index";
// import { makeStyles } from "@material-ui/core/styles";
import ViewBooking from "../ViewBooking/index";
import FeedBack from "../FeedBack/index";

// const useStyles = makeStyles({});

function Routing() {
  // const classes = useStyles();
  const [uid, setUid] = useState();
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      let uid = user?.uid;
      setUid(uid);
    });
  }, []);
  return (
    <div>
      <Router>
        {uid ? <Drawer /> : <Redirect to="/login" />}
        <Switch>
          <Route path="/signup" component={SignUp} />
          <Route exact path="/login" component={SignIn} />
          <Route path="/bookparking" component={Dashboard} />
          <Route path="/viewbooking" component={ViewBooking} />
          <Route path="/feedback" component={FeedBack} />
        </Switch>
      </Router>
    </div>
  );
}

export default Routing;
