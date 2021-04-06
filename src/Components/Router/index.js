import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from "../Authentication/SignIn/index";
import SignUp from "../Authentication/Signup/index";
import firebase from "firebase/app";
import Drawer from "../Drawer/index";
import Dashboard from "../Dashboard/index";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  container: {
    marginLeft: "27.2vh",
  },
});

function Routing() {
  const classes = useStyles();
  const [uid, setUid] = useState();
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      let uid = user?.uid;
      setUid(uid);
    });
  }, []);
  return (
    <div className={classes.container}>
      <Router>
        {uid ? <Drawer /> : <></>}
        <Switch>
          <Route path="/signup" component={SignUp} />
          <Route exact path="/login" component={SignIn} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
    </div>
  );
}

export default Routing;
