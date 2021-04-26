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
import ViewUsers from "../ViewUsers/index";
import AddLocations from '../AddLocations/index';
import {CircularProgress} from '@material-ui/core'

function Routing() {
  const [uid, setUid] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true)
    firebase.auth().onAuthStateChanged((user) => {
      let uid = user?.uid;
      setUid(uid);
      setIsLoading(false)
    });
  }, [uid]);

  return (
    <>
    {isLoading ? (
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center',height: '100vh'}}>
        <p style={{marginRight: 20}}>Loading... Please wait...</p>
        <CircularProgress color="secondary" />
      </div>
    ) : (
    <div>
      <Router>
       {  uid ? <Drawer /> : [] }
        <Switch>
          <Route exact path="/" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/bookparking" component={Dashboard} />
          <Route path="/viewbooking" component={ViewBooking} />
          <Route path="/viewusers" component={ViewUsers} />
          <Route path="/feedback" component={FeedBack} />
          <Route path="/addlocation" component={AddLocations} />
          <Route path="/atriummall/:location" component={AtriumMall} />
          <Route path="/dolmenmall/:location" component={DolmenMall} />
          <Route path="/oceanmall/:location" component={OceanMall} />
        </Switch>
      </Router>
    </div>
    )}
    </>
  );
}

export default Routing;
