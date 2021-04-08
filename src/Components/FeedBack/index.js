import React, { useState } from "react";
import { Card, Input } from "@material-ui/core";
import "./index.css";
import Button from "@material-ui/core/Button";
import FeedbackOutlinedIcon from "@material-ui/icons/FeedbackOutlined";
import List from "../ListComponent/index";

function FeedBack() {
  const [feedBack, setFeedBack] = useState("");
  const [newArr, setNewArr] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    let inputText = feedBack;
    let arr = [...newArr];
    arr.push(inputText);
    setNewArr(arr);
    setFeedBack("");
  };

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
          {newArr.map((item, index) => {
            return <List item={item} index={index} handleReply={handleReply} />;
          })}
          <div style={{ paddingBottom: "23%" }} />
        </div>
      </Card>
    </div>
  );
}

export default FeedBack;
