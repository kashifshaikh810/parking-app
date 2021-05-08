import React, { useState, useEffect } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import "./index.css";
import firebase from "firebase";
import Header from "../../Header/index";
import Button from "@material-ui/core/Button";
import { Input } from "@material-ui/core";
import Card from "@material-ui/core/Card";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [errMyMsg, setErrMyMsg] = useState("");
  const [validationError, setvalidationError] = useState("");
  let history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    let ifBlock 
    firebase.database().ref('/newUser/').on('value', (snap) => {
      Object.keys(snap.val()).filter(user => {
        if (snap.val()[user].email === email && snap.val()[user]?.block) {
            ifBlock = snap.val()[user].email
            setvalidationError("Admin has blocked you")
          }
        })
        if (!ifBlock) {
            firebase.auth().signInWithEmailAndPassword(email, password).then(({user}) => {
              if(user.email === 'admin@mail.com'){
                history.push("/viewbooking");
              }else{
                history.push("/bookparking");
              }
              setEmail("");
              setPassword("");
              setEmail("");
              setvalidationError("");
            })
            .catch((err) => {
              console.log(err);
              setErrMsg(err?.message);
            })
      }
    })
  };

  const emailHandleChange = (event) => {
    setEmail(event.target.value);
    setErrMsg("");
    setErrMyMsg("");
    setvalidationError("");
  };

  const passwordHandleChange = (event) => {
    setPassword(event.target.value);
    setErrMsg("");
    setErrMyMsg("");
    setvalidationError("");
  };

  useEffect(() => {
    setEmail("");
    setPassword("");
    setErrMsg("");
    setErrMyMsg("");
  }, []);

  if (firebase.auth()?.currentUser?.uid) {
    history.push("/bookparking");
  }
  return (
    <>
      <Header />
      <div className="container">
        <Card className="login">
          <h2 className="loginTxt">Sign In</h2>
          <form autoComplete="on" onSubmit={(event) => handleSubmit(event)}>
            <div className="emailInput">
              <div className="label">
                <label>
                  Email <br />
                </label>
              </div>
              <div className="input">
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(event) => emailHandleChange(event)}
                  required
                  autoComplete="on"
                />
              </div>
            </div>
            <div>
              <div className="label">
                <label>
                  Password <br />
                </label>
              </div>
              <div className="input">
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(event) => passwordHandleChange(event)}
                  required
                />
              </div>
            </div>
            <div>
              <div style={{ textAlign: "center", color: "red" }}>
                <p>{errMsg}</p>
              </div>
              <div style={{ textAlign: "center", color: "red" }}>
                <p>{errMyMsg}</p>
              </div>
              <div style={{ textAlign: "center", color: "red" }}>
                <p>{validationError}</p>
              </div>
              <div className="btn">
                <Button type="submit" variant="outlined" color="primary">
                  Log In
                </Button>
              </div>
              <div className="routTxt">
                <p className="NeedTxt">Don't have an account ?</p>
                <Link to="/signup">
                  <p className="clickTxt">Click here.</p>
                </Link>
              </div>
            </div>
          </form>
        </Card>
      </div>
    </>
  );
}

export default SignIn;
