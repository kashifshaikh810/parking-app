import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "./index.css";
import { Link, useHistory } from "react-router-dom";
import Header from "../../Header/index";
import Button from "@material-ui/core/Button";
import { Input } from "@material-ui/core";
import Card from "@material-ui/core/Card";

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [errMyMsg, setErrMyMsg] = useState("");
  let history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (firstName && lastName && email && password) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        const uid = firebase.auth()?.currentUser?.uid;
        firebase.database().ref(`/newUser/${uid}`).set({
          firstName,
          lastName,
          email,
          password,
        });
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        await firebase.auth().signOut();
        history.push("/login");
      } catch (err) {
        console.log(err);
        setErrMsg(err?.message);
      }
    } else {
      setErrMyMsg("All Fields Are Required");
    }
  };

  const firstNameHandleChange = (event) => {
    setFirstName(event.target.value);
    setErrMsg("");
    setErrMyMsg("");
  };

  const lastNameHandleChange = (event) => {
    setLastName(event.target.value);
    setErrMsg("");
    setErrMyMsg("");
  };

  const emailHandleChange = (event) => {
    setEmail(event.target.value);
    setErrMsg("");
    setErrMyMsg("");
  };

  const passwordHandleChange = (event) => {
    setPassword(event.target.value);
    setErrMsg("");
    setErrMyMsg("");
  };

  useEffect(() => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setErrMsg("");
    setErrMyMsg("");
  }, []);

  return (
    <>
      <Header />
      <div className="FirstContainer">
        {/* <div className="signup"> */}
        <Card className="signup">
          <h2 className="signupTxt">Sign Up</h2>
          <form autoComplete="on" onSubmit={(event) => handleSubmit(event)}>
            <div className="emailInput">
              <div className="signupLabel">
                <label>
                  First Name <br />
                </label>
              </div>
              <div className="signUpInput">
                <Input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(event) => firstNameHandleChange(event)}
                  required
                />
              </div>
            </div>
            <div>
              <div className="signupLabel">
                <label>
                  Last Name <br />
                </label>
              </div>
              <div className="signUpInput">
                <Input
                  type="text"
                  placeholder="last Name"
                  value={lastName}
                  onChange={(event) => lastNameHandleChange(event)}
                  required
                />
              </div>
            </div>

            <div className="emailInput">
              <div className="signupLabel">
                <label>
                  Email <br />
                </label>
              </div>
              <div className="signUpInput">
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(event) => emailHandleChange(event)}
                  required
                />
              </div>
            </div>
            <div>
              <div className="signupLabel">
                <label>
                  Password <br />
                </label>
              </div>
              <div className="signUpInput">
                <Input
                  type="password"
                  placeholder="password"
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
              <div className="submitBtn">
                <Button type="submit" variant="outlined" color="primary">
                  Sign Up
                </Button>
              </div>
              <div className="signupRoutTxt">
                <p className="navTxt">Already Have An Account ?</p>
                <Link to="/login">
                  <p className="clickHereTxt">Click here.</p>
                </Link>
              </div>
            </div>
          </form>
          {/* </div> */}
        </Card>
      </div>
    </>
  );
}

export default SignUp;
