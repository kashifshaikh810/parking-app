import React, { useState } from "react";
import { Input } from "@material-ui/core";
import Button from "@material-ui/core/Button";

const List = ({ item, handleReply, index }) => {
  const [reply, setReply] = useState("");
  const [newArr, setNewArr] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleSub = (event, index) => {
    event.preventDefault();
    let input = reply;
    let data = [...newArr];
    data.push(input);
    setNewArr(data);
    handleReply(event, index);
    setIsLoading(true);
    setReply("");
  };

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
        <li>FeedBack : {item.feedBack}</li>
        <div style={{ display: "flex" }}>
          <p style={{ margin: 0, padding: 0 }}>Reply :</p>
          {newArr.map((list, i) => {
            return (
              <p style={{ margin: 0, padding: 0, marginLeft: 5 }}>{list}</p>
            );
          })}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          {isLoading ? (
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
          )}
        </div>
      </ul>
    </div>
  );
};

export default List;
