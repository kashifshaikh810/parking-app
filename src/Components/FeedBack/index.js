import React, { useState, useEffect } from "react";
import { Card, Input } from "@material-ui/core";
import "./index.css";
import Button from "@material-ui/core/Button";
import FeedbackOutlinedIcon from "@material-ui/icons/FeedbackOutlined";
import List from "../ListComponent/index";
import firebase from "firebase/app";

function FeedBack() {
  const [feedBack, setFeedBack] = useState("");
  const [newArr, setNewArr] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    let uid = firebase.auth()?.currentUser?.uid;
    firebase.database().ref(`/feedBacks/${uid}`).push({
      feedBack: feedBack,
    });
    // let inputText = feedBack;
    // let arr = [...newArr];
    // arr.push(inputText);
    // setNewArr(arr);
    setFeedBack("");
  };

  const getData = () => {
    const uid = firebase.auth()?.currentUser?.uid;
    firebase
      .database()
      .ref(`/feedBacks/${uid}`)
      .on("value", (snapshot) => {
        const data = snapshot.val() ? snapshot.val() : [];
        setNewArr(data);
      });
  };

  useEffect(async () => {
    await getData();
  }, []);
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
            <Button type="submit" variant="contained" color="secondary">
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
              marginTop: 10,
              marginLeft: 10,
              fontWeight: "bold",
            }}
          >
            Feed-Back's
          </p>
        </div>
        <div
          style={{
            overflowY: "scroll",
            width: "100%",
            float: "left",
            height: "500px",
          }}
        >
          {newArr && Object.keys(newArr).length > 0
            ? newArr &&
              Object.keys(newArr).map((item, index) => {
                return (
                  <List
                    item={newArr[item]}
                    index={index}
                    handleReply={handleReply}
                  />
                );
              })
            : null}
          <div style={{ paddingBottom: "30%" }} />
        </div>
      </Card>
    </div>
  );
}

export default FeedBack;
