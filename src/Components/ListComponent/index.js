import React, { useState, useEffect } from "react";
import { Input } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import firebase from "firebase/app";
import Para from "../ParaGraph/index";

const List = ({ item, handleReply, index, id, toTitleCase }) => {
  const [reply, setReply] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [adminRoll, setAdminRoll] = useState("");
  
  const handleSub = (event, index) => {
    event.preventDefault();
    let firstName = item.firstName
    let lastName = item.lastName   
    firebase.database().ref(`/feedBacks/${item.uid}/${item.id}`).set({ firstName: firstName, lastName: lastName,  feedBack: item.feedBack, Reply: reply });
    setIsLoading(true);
    setReply("");
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
      { adminRoll === 'admin@mail.com' ?
       <div>
          <p style={{textAlign: 'right'}}>Feed-Back By <b> {item.firstName} {item.lastName} </b></p>
        </div>
        : []
      }
        <li>
          <b>FeedBack : </b> {item.feedBack}
        </li>
        <div style={{ display: "flex" }}>
          <p style={{ margin: 0, padding: 0, fontWeight: "bold" }}>Admin :</p>
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
              !item.Reply ?
              <Button
                onClick={handleClick}
                variant="contained"
                style={{ marginTop: 0, padding: 0, marginBottom: 7 }}
                color="primary"
              >
                Reply
              </Button>
              : null
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
