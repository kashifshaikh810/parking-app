import React, { useEffect, useState } from "react";
import { Card } from "@material-ui/core";
import "./index.css";
import firebase from "firebase/app";

const ViewBooking = () => {
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    let uid = firebase.auth()?.currentUser?.uid;
    firebase
      .database()
      .ref(`/bookings/${uid}`)
      .on("value", (snapshot) => {
        let data = snapshot.val() ? Object.values(snapshot.val()) : [];
        setUserData(data);
        setIsLoading(false);
      });
  }, [isLoading]);

  return (
    <div className="viewBooking">
      {isLoading ? (
        <p style={{ textAlign: "center" }}>Loading...</p>
      ) : (
        <Card elevation={3} className="card">
          <div className="align">
            <h2 className="header">Bookings</h2>
          </div>
          <Card
            elevation={10}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "60%",
              height: "50%",
              marginLeft: "18%",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <table id="customers">
                <thead>
                  <tr>
                    <th>Location</th>
                    <th>Slot</th>
                    <th>End Time</th>
                    <th>Start Time</th>
                    <th>Date</th>
                  </tr>
                </thead>
                {userData.map((newData, i) => {
                  return (
                    <tr>
                      <td>{newData.Location}</td>
                      <td>Slots No. {newData.Slots}</td>
                      <td>{newData.StartTime}</td>
                      <td>{newData.EndTime} Hours</td>
                      <td>{newData.selectDate}</td>
                    </tr>
                  );
                })}
              </table>
            </div>
          </Card>
        </Card>
      )}
    </div>
  );
};

export default ViewBooking;
