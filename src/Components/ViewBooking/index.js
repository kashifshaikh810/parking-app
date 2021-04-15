import React, { useEffect, useState } from "react";
import { Card, CircularProgress } from "@material-ui/core";
import "./index.css";
import firebase from "firebase/app";

const ViewBooking = () => {
  const [userData, setUserData] = useState([]);
  const [adminData, setAdminData] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [adminRoll, setAdminRoll] = useState("");

  const getUserData = () => {
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
  };

  const getAdminData = () => {
    setIsLoader(true);
    firebase
      .database()
      .ref("/bookings/")
      .on("value", (snapshot) => {
        let data = snapshot.val() ? Object.values(snapshot.val()) : [];
        let allData = [];
        data.forEach((test, i) => {
          const aa = Object.values(test);
          const newData = Object.values(aa);
          newData?.forEach((data) => {
            allData.push(data);
          });
        });
        setAdminData(allData);
        setIsLoader(false);
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
    getUserData();
    getAdminData();
    getAdminRoll();
  }, [isLoading]);

  return (
    <div className="viewBooking">
      <Card elevation={3} className="card">
        <div className="align">
          <h2 className="header">Bookings</h2>
        </div>
        <Card
          elevation={20}
          style={{
            width: "60%",
            marginLeft: "22%",
            overflow: "overlay",
          }}
        >
          {adminRoll !== "admin@mail.com" ? (
            isLoading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "20vh",
                }}
              >
                <CircularProgress color="secondary" />
              </div>
            ) : (
              <>
                {userData?.length ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <table className="customers">
                      <thead>
                        <tr>
                          <th style={{ textAlign: "center" }}>Id</th>
                          <th style={{ textAlign: "center" }}>Location</th>
                          <th style={{ textAlign: "center" }}>Slot</th>
                          <th tyle={{ textAlign: "center" }}>Start Time</th>
                          <th tyle={{ textAlign: "center" }}>End Time</th>
                          <th style={{ textAlign: "center" }}>Date</th>
                        </tr>
                      </thead>
                      {userData.map((newData, i) => {
                        return (
                          <tr>
                            <td style={{ textAlign: "center" }}>Id No. {i}</td>
                            <td tyle={{ textAlign: "center" }}>{newData.Location}</td>
                            <td tyle={{ textAlign: "center" }}>Slot No. {newData.Slots}</td>
                            <td style={{ textAlign: "center" }}>
                              {newData.StartTime}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {newData.EndTime}
                            </td>
                            <td tyle={{ textAlign: "center" }}>{newData.selectDate}</td>
                          </tr>
                        );
                      })}
                    </table>
                  </div>
                ) : (
                  []
                )}
              </>
            )
          ) : (
            <></>
          )}

          {adminRoll === "admin@mail.com" ? (
            isLoader ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "40vh",
                }}
              >
                <CircularProgress color="secondary" />
              </div>
            ) : (
              <>
                {adminData?.length ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <table className="customers">
                      <thead>
                        <tr>
                          <th style={{ textAlign: "center" }}>Id</th>
                          <th style={{ textAlign: "center" }}>Location</th>
                          <th style={{ textAlign: "center" }}>Slot</th>
                          <th style={{ textAlign: "center" }}>Start Time</th>
                          <th style={{ textAlign: "center" }}>End Time</th>
                          <th style={{ textAlign: "center" }}>Date</th>
                        </tr>
                      </thead>
                      {adminData && Object.keys(adminData).length > 0
                        ? adminData &&
                          Object.keys(adminData).map((data, i) => {
                            return (
                              <tr>
                                <td style={{ textAlign: "center" }}>
                                  Id No. {i}
                                </td>
                                <td style={{ textAlign: "center" }}>{adminData[data].Location}</td>
                                <td style={{ textAlign: "center" }}>Slot No. {adminData[data].Slots}</td>
                                <td style={{ textAlign: "center" }}>
                                  {adminData[data].StartTime}
                                </td>
                                <td style={{ textAlign: "center" }}>
                                  {adminData[data].EndTime}
                                </td>
                                <td style={{ textAlign: "center" }}>{adminData[data].selectDate}</td>
                              </tr>
                            );
                          })
                        : null}
                    </table>
                  </div>
                ) : null}
              </>
            )
          ) : null}
        </Card>
      </Card>
    </div>
  );
};

export default ViewBooking;
