import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import SignIn from '../Authentication/SignIn/index';
import SignUp from '../Authentication/Signup/index';
import firebase from 'firebase/app';
import Drawer from '../Drawer/index';
import Dashboard from '../BookParking/index';
import ViewBooking from '../ViewBooking/index';
import FeedBack from '../FeedBack/index';
import AtriumMall from '../AtriumMallSlots/index';
import ViewUsers from '../ViewUsers/index';
import AddLocations from '../AddLocations/index';
import ViewAddedLocations from '../ViewAddedLocations/index';
import { CircularProgress } from '@material-ui/core';

function Routing() {
  const [uid, setUid] = useState();
  const [isLoading, setIsLoading] = useState(false);
  // const [adminRoll, setAdminRoll] = useState('');

  // const getAdminRoll = () => {
  //   let uid = firebase.auth()?.currentUser?.uid;
  //   firebase
  //     .database()
  //     .ref(`/newUser/${uid}`)
  //     .on('value', (snapshot) => {
  //       let data = snapshot.val() ? Object.values(snapshot.val()) : [];
  //       setAdminRoll(data[0]);
  //     });
  // };

  useEffect(() => {
    setIsLoading(true);
    firebase.auth().onAuthStateChanged((user) => {
      let uid = user?.uid;
      setUid(uid);
      setIsLoading(false);
    });
    // getAdminRoll();
  }, []);

  return (
    <>
      {isLoading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <p style={{ marginRight: 20 }}>Loading... Please wait...</p>
          <CircularProgress color='secondary' />
        </div>
      ) : (
        <div>
          <Router>
            {uid ? <Drawer /> : <Redirect to='/' />}
            <Switch>
              <Route exact path='/' component={SignIn} />
              <Route path='/signup' component={SignUp} />
                <Route path='/bookparking' component={Dashboard} />
                <Route path='/viewbooking' component={ViewBooking} />
                <Route
                  path='/viewaddlocations'
                  component={ViewAddedLocations}
                />
                <Route path='/viewusers' component={ViewUsers} />
                <Route path='/feedback' component={FeedBack} />
                <Route path='/addlocation' component={AddLocations} />
                <Route
                  path='/atriummall/:location/:slots/:booked'
                  component={AtriumMall}
                />
            </Switch>
          </Router>
        </div>
      )}
    </>
  );
}

export default Routing;
