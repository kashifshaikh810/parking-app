import React, { useState, useEffect } from "react";
import { Input } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import firebase from "firebase/app";
import Para from "../ParaGraph/index";

const List = ({ item, handleReply, index, id }) => {
  const [reply, setReply] = useState("");
  const [newArr, setNewArr] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [adminRoll, setAdminRoll] = useState("");
  
  const handleSub = (event, index) => {
    event.preventDefault();
    firebase.database().ref(`/feedBacks/${item.uid}/${item.id}`).set({ feedBack: item.feedBack, Reply: reply });
    setIsLoading(true);
    setReply("");
  };

  const getReplyData = () => {
    const uid = firebase.auth()?.currentUser?.uid;
    firebase
      .database()
      .ref(`/feedBacks/${uid}`)
      .on("value", (snapshot) => {
        const data = snapshot.val() ? snapshot.val() : [];
        setNewArr(data);
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

  useEffect(() => {
    getReplyData();
    getAdminRoll();
  }, [isLoading]);

  const replyHandleChange = (event) => {
    setReply(event.target.value);
  };

  const handleCancel = (event) => {
    event.preventDefault();
    setIsLoading(true);
    setReply("");
  };

  const handleClick = () => {
    setIsLoading(false);
  };

  return (
    <div>
      <ul
        style={{
          listStyleType: "none",
          borderBottom: "1px solid #b3b3b3",
          width: "90%",
          marginLeft: 20,
        }}
      >
        <li>
          <b>FeedBack : </b> {item.feedBack}
        </li>
        <div style={{ display: "flex" }}>
          <p style={{ margin: 0, padding: 0, fontWeight: "bold" }}>Reply :</p>
            <Para item={item} />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          {adminRoll === "admin@mail.com" ? (
            isLoading ? (
              <Button
                onClick={handleClick}
                variant="contained"
                style={{ marginTop: 0, padding: 0, marginBottom: 7 }}
                color="primary"
              >
                Reply
              </Button>
            ) : (
              <>
                <form onSubmit={(event) => handleSub(event, index)}>
                  <Input
                    type="text"
                    placeholder="Your Reply..."
                    value={reply}
                    required
                    onChange={(event) => replyHandleChange(event)}
                    color="secondary"
                  />
                  <Button type="submit" variant="text" color="secondary">
                    Send
                  </Button>
                </form>
                <Button
                  onClick={(event) => handleCancel(event)}
                  variant="text"
                  color="secondary"
                >
                  Cancel
                </Button>
              </>
            )
          ) : null}
        </div>
      </ul>
    </div>
  );
};

export default List;
