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
        const newData = data
        newData?.forEach((bookings, i) => {
          // setUserData(bookings)
          setIsLoading(false)
          })
      });
  };

  const get = () => {
    let uid = firebase.auth()?.currentUser?.uid;
    firebase
      .database()
      .ref(`/bookings/${uid}`)
      .on("value", (snapshot) => {
        let data = snapshot.val() ? Object.values(snapshot.val()) : [];
        let user = []
        const newData = data
        newData?.forEach((bookings, i) => {
          let ddd = Object.values(bookings)
          ddd.forEach((item) => {
            user.push(item)
          })
          setUserData(user)
          })
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
            const newData = Object.values(data)
            newData.forEach((bookings) => {
              allData.push(bookings);
            })
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
    get()
    getAdminData();
    getUserData();
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
                {Object.keys(userData)?.length > 0 ? (
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
                          <th style={{ textAlign: "center" }}>Id No</th>
                          <th style={{ textAlign: "center" }}>Location</th>
                          <th style={{ textAlign: "center" }}>Slot</th>
                          <th tyle={{ textAlign: "center" }}>Start Time</th>
                          <th tyle={{ textAlign: "center" }}>End Time</th>
                          <th style={{ textAlign: "center" }}>Date</th>
                        </tr>
                      </thead>
                      {userData && Object.keys(userData)?.map((newData, i) => {
                        return ( 
                          <tr key={i}>
                            <td style={{ textAlign: "center" }}>{i}</td>
                            <td tyle={{ textAlign: "center" }}>
                              {userData[newData].Location}
                            </td>
                            <td tyle={{ textAlign: "center" }}>
                              {userData[newData].Slots}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {userData[newData].StartTime}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {userData[newData].EndTime}
                            </td>
                            <td tyle={{ textAlign: "center" }}>
                              {userData[newData].selectDate}
                            </td>
                          </tr>
                          );
                      })} 
                    </table>
                  </div>
                ) : (
                  <p style={{ textAlign: "center" }}>no bookings</p>
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
                          <th style={{ textAlign: "center" }}>Id No</th>
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
                                  {i}
                                </td>
                                <td style={{ textAlign: "center" }}>
                                  {adminData[data].Location}
                                </td>
                                <td style={{ textAlign: "center" }}>
                                  {adminData[data].Slots}
                                </td>
                                <td style={{ textAlign: "center" }}>
                                  {adminData[data].StartTime}
                                </td>
                                <td style={{ textAlign: "center" }}>
                                  {adminData[data].EndTime}
                                </td>
                                <td style={{ textAlign: "center" }}>
                                  {adminData[data].selectDate}
                                </td>
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
