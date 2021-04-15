import React, { useState, useEffect } from "react";
import { Card, Input, CircularProgress } from "@material-ui/core";
import "./index.css";
import Button from "@material-ui/core/Button";
import FeedbackOutlinedIcon from "@material-ui/icons/FeedbackOutlined";
import List from "../ListComponent/index";
import firebase from "firebase/app";

function FeedBack() {
  const [feedBack, setFeedBack] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [newArr, setNewArr] = useState([]);
  const [adminRoll, setAdminRoll] = useState("");
  const [newData, setNewData] = useState([]);
  const [keys, setKeys] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    let uid = firebase.auth()?.currentUser?.uid;
    firebase.database().ref(`/feedBacks/${uid}`).push({
      feedBack: feedBack,
    });
    setFeedBack("");
  };

  const getData = () => {
    setIsLoading(true);
    const uid = firebase.auth()?.currentUser?.uid;
    firebase
      .database()
      .ref(`/feedBacks/${uid}`)
      .on("value", (snapshot) => {
        const data = snapshot.val() ? snapshot.val() : [];
        setNewArr(data);
        setIsLoading(false);
      });
  };

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

  const getAdminData = () => {
    firebase
      .database()
      .ref(`/feedBacks/`)
      .on("value", (snapshot) => {
        let data = snapshot.val() ? Object.values(snapshot.val()) : [];
        let pushUid = snapshot.val() ? Object.keys(snapshot.val()) : [];
        let allData = [];
        data.forEach((test, j) => {
          let pushKey = Object.keys(test);
          let aa = Object.values(test);
          let newData = Object.values(aa);
          newData?.forEach((data, i) => {
            allData.push({...data, id: pushKey[i], uid: pushUid[j]});
          });
          setNewData(allData);
        });
      });
  };

  useEffect(() => {
    getData();
    getAdminRoll();
    getAdminData();
  }, [isLoading]);

  const handleReply = (event, index) => {
    event.preventDefault();
  };

  const feedBackHandleChange = (event) => {
    setFeedBack(event.target.value);
  };
  return (
    <div className="feedBack">
      <Card elevation={3} className="feedBackCard">
        <h2 className="feedBackHead">Your Feedback is Valuable for Us</h2>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div style={{ marginLeft: 15 }}>
            <Input
              type="text"
              placeholder="FeedBack"
              value={feedBack}
              onChange={(event) => feedBackHandleChange(event)}
              required
              color="secondary"
              disabled={Boolean(adminRoll === "admin@mail.com")}
            />
          </div>
          <br />
          <div
            style={{
              marginLeft: 15,
              borderBottom: "1px solid #b3b3b3",
              paddingBottom: 20,
            }}
          >
            <Button
              disabled={Boolean(adminRoll === "admin@mail.com")}
              type="submit"
              variant="contained"
              color="secondary"
            >
              Send
            </Button>
          </div>
        </form>
        <div
          style={{
            marginLeft: 15,
            marginTop: 20,
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div className="feedIcon">
            <FeedbackOutlinedIcon
              style={{ fontSize: 28, marginTop: 4, color: "#f1f1f1" }}
            />
          </div>
          <p
            style={{
              fontSize: 20,
              // marginTop: 10,
              marginLeft: 10,
              fontWeight: "bold",
            }}
          >
            Feed-Back's
          </p>
        </div>
        {adminRoll !== "admin@mail.com" ? (
          isLoading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "40%",
              }}
            >
              <CircularProgress color="secondary" />
            </div>
          ) : (
            <div
              style={{
                overflowY: "scroll",
                width: "100%",
                float: "left",
                height: "500px",
              }}
            >
              {newArr && Object.keys(newArr).length > 0 ? (
                newArr &&
                Object.keys(newArr).map((item, index) => {
                  return (
                    <List
                      item={newArr[item]}
                      index={index}
                      handleReply={handleReply}
                    />
                  );
                })
              ) : (
                <h1 style={{ textAlign: "center" }}>No Feed Back's</h1>
              )}
              <div style={{ paddingBottom: "25%" }} />
            </div>
          )
        ) : null}

        {adminRoll === "admin@mail.com" ? (
          isLoading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "40%",
              }}
            >
              <CircularProgress color="secondary" />
            </div>
          ) : (
            <div
              style={{
                overflowY: "scroll",
                width: "100%",
                float: "left",
                height: "500px",
              }}
            >
              {newData && Object.keys(newData).length > 0 ? (
                newData.map((item, index) => {
                  return (
                    <List
                      item={item}
                      index={index}
                      handleReply={handleReply}
                      id={keys}
                      key={index.toString()}
                    />
                  );
                })
              ) : (
                <h1 style={{ textAlign: "center" }}>
                  No Feed back's Avalaible
                </h1>
              )}
              <div style={{ paddingBottom: "25%" }} />
            </div>
          )
        ) : (
          []
        )}
      </Card>
    </div>
  );
}

export default FeedBack;
