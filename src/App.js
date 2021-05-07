import React,{useEffect} from "react";
import Routing from "../src/Components/Router/index";
import firebase from 'firebase/app';

function App() {

  const userBlock = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!!user) {
        firebase.database().ref("/newUser/").child(user?.uid).on("value", (snapshot) => {
          if (snapshot.val().hasOwnProperty('block')) {
            if (snapshot.val()?.block === true) {
              firebase.auth().signOut()
            };
          };
        });
      };
    });
  };

  useEffect(() => {
    userBlock()
  }, [])

  return (
    <div className="App">
      <Routing />
    </div>
  );
}

export default App;
