import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from "../Authentication/SignIn/index";
import SignUp from "../Authentication/Signup/index";
import firebase from "firebase/app";
import Drawer from "../Drawer/index";
import Dashboard from "../BookParking/index";
import ViewBooking from "../ViewBooking/index";
import FeedBack from "../FeedBack/index";
import AtriumMall from "../SlotsContainer/AtriumMallSlots/index";
import DolmenMall from "../SlotsContainer/DolmenMallSlots/index";
import OceanMall from "../SlotsContainer/OceanMallSlots/index";

function Routing() {
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
        {uid ? <Drawer /> : null}
        <Switch>
          <Route exact path="/" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/bookparking" component={Dashboard} />
          <Route path="/viewbooking" component={ViewBooking} />
          <Route path="/feedback" component={FeedBack} />
          <Route path="/atriummall/:location" component={AtriumMall} />
          <Route path="/dolmenmall/:location" component={DolmenMall} />
          <Route path="/oceanmall/:location" component={OceanMall} />
        </Switch>
      </Router>
    </div>
  );
}

export default Routing;
