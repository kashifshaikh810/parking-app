import React, { useState, useEffect } from "react";
import { Button, Card, CircularProgress } from "@material-ui/core";
import firebase from "firebase/app";

const ViewUsers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [newArr, setNewArr] = useState([]);

  const getAllUsers = () => {
    setIsLoading(true);
    firebase
      .database()
      .ref("/newUser/")
      .on("value", (snapshot) => {
        const data = snapshot.val() ? Object.values(snapshot.val()) : [];
        setNewArr(data);
        setIsLoading(false);
      });
  };

  function toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }

  useEffect(() => {
    getAllUsers();
  }, [isLoading]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#303030",
        height: "90.5vh",
      }}
    >
      <Card
        elevation={22}
        style={{
          width: "90%",
          height: "60vh",
        }}
      >
        <h1 style={{ textAlign: "center" }}>View Users</h1>
        <Card
          elevation={20}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "60%",
            marginLeft: "20%",
            overflow: "overlay",
          }}
        >
          {isLoading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "30vh",
              }}
            >
              <CircularProgress color="secondary" />
            </div>
          ) : (
            <table className="customers">
              <thead>
                <tr>
                  <th style={{ textAlign: "center" }}>Email</th>
                  <th style={{ textAlign: "center" }}>First Name</th>
                  <th style={{ textAlign: "center" }}>Last Name</th>
                  <th style={{ textAlign: "center" }}>Option</th>
                </tr>
              </thead>
              {newArr.map((data) => {
                return (
                  data.email !== 'admin@mail.com' ?
                  <tr>
                    <td style={{ textAlign: "center" }}>{toTitleCase(data.email)}</td>
                    <td style={{ textAlign: "center" }}>{toTitleCase(data.firstName)}</td>
                    <td style={{ textAlign: "center" }}>{toTitleCase(data.lastName)}</td>
                    <td style={{ textAlign: "center" }}>
                      <Button variant="contained">Block</Button>
                    </td>
                  </tr>
                  : null
                );
              })}
            </table>
          )}
        </Card>
      </Card>
    </div>
  );
};

export default ViewUsers;
