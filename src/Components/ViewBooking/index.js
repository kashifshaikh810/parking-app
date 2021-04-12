import React, { useEffect, useState } from "react";
import { Card, CircularProgress } from "@material-ui/core";
import "./index.css";
import firebase from "firebase/app";

const ViewBooking = () => {
  const [userData, setUserData] = useState([]);
  const [adminData, setAdminData] = useState([]);
  const [isAdminLoading, setIsAdminLoading] = useState(false);
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

  const admin = () => {
    setIsAdminLoading(true);
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
        setIsAdminLoading(false);
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
    admin();
    getAdminRoll();
  }, [isLoading && isAdminLoading]);

  return (
    <div className="viewBooking">
      <Card elevation={3} className="card">
        <div className="align">
          <h2 className="header">Bookings</h2>
        </div>
        <Card
          elevation={20}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "60%",
            height: "60%",
            marginLeft: "22%",
            overflow: "overlay",
          }}
        >
          {!!adminRoll ? (
            isLoading ? (
              <CircularProgress color="secondary" />
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
                          <th>Start Time</th>
                          <th>End Time</th>
                          <th style={{ textAlign: "center" }}>Date</th>
                        </tr>
                      </thead>
                      {userData.map((newData, i) => {
                        return (
                          <tr>
                            <td style={{ textAlign: "center" }}>Id No. {i}</td>
                            <td>{newData.Location}</td>
                            <td>Slot No. {newData.Slots}</td>
                            <td style={{ textAlign: "center" }}>
                              {newData.StartTime}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {newData.EndTime}
                            </td>
                            <td>{newData.selectDate}</td>
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
            isAdminLoading ? (
              <CircularProgress color="secondary" />
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
                          <th>Start Time</th>
                          <th>End Time</th>
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
                                <td>{adminData[data].Location}</td>
                                <td>Slot No. {adminData[data].Slots}</td>
                                <td style={{ textAlign: "center" }}>
                                  {adminData[data].StartTime}
                                </td>
                                <td style={{ textAlign: "center" }}>
                                  {adminData[data].EndTime}
                                </td>
                                <td>{adminData[data].selectDate}</td>
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
