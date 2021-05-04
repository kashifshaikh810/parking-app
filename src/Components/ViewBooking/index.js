import React, { useEffect, useState } from "react";
import { Card, CircularProgress } from "@material-ui/core";
import "./index.css";
import firebase from "firebase/app";
import moment from "moment";

var format = "hh:mm:ss";

const ViewBooking = () => {
  const [userData, setUserData] = useState([]);
  const [adminData, setAdminData] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [adminRoll, setAdminRoll] = useState("");

  const getUserData = () => {
    setIsLoading(true)
    let uid = firebase.auth()?.currentUser?.uid;
    firebase
      .database()
      .ref(`/bookings/${uid}`)
      .on("value", (snapshot) => {
        let data = snapshot.val() ? Object.values(snapshot.val()) : [];
        let user = []
        const newData = data
        newData?.forEach((bookings, i) => {
          let add = Object.values(bookings)
          add.forEach((item) => {
            user.push(item)
          })
          // user = user.sort(function compare(a, b) {
          //   let dateA = new Date(b.selectDate)
          //   let dateB = new Date(a.selectDate)
          //   return dateA - dateB;
          // });

          // user = user.sort(function compare(a, b) {
          //   let get = new Date(b.StartTime).getTime()
          //   let getTwo = new Date(a.StartTime).getTime()
          //   let dateA = new Date(a.selectDate + " " + getTwo)
          //   let dateB = new Date(b.selectDate + " " + get)
          //   return dateB - dateA;
          // }) 

          let array = [...user];
        user = user.sort((a, b) => {
            return new Date(b.selectDate).getTime() - new Date(a.selectDate).getTime()
        });
        console.log("time", array)
        user = user.sort((a, b) => {
            if (new Date(a.selectDate).getTime() === new Date(b.selectDate).getTime()) {
                if (Number(b.StartTime.split(":")[0]) < Number(a.StartTime.split(":")[0])) {
                    return 1
                } else {
                    return -1
                }
            }
            else {
                return 0
            }
        });

          setUserData(user)
          setIsLoading(false)
          })
      });
  };
  // user = user.sort(function compare(a, b) {
  //   let dateA = moment(a.selectDate).format('YYYY-MM-DD');
  //   let dateB = moment(b.selectDate).format('YYYY-MM-DD');
  //   return dateA - dateB;
  // });
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
          allData = allData.sort(function compare(a, b) {
            let dateA = new Date(b.selectDate);
            let dateB = new Date(a.selectDate);
            return dateA - dateB;
          });

          let array = [...allData];
          allData = allData.sort((a, b) => {
              return new Date(b.selectDate).getTime() - new Date(a.selectDate).getTime()
          });
          console.log("time", array)
          allData = allData.sort((a, b) => {
              if (new Date(a.selectDate).getTime() === new Date(b.selectDate).getTime()) {
                  if (Number(b.StartTime.split(":")[0]) < Number(a.StartTime.split(":")[0])) {
                      return 1
                  } else {
                      return -1
                  }
              }
              else {
                  return 0
              }
          });
        });
        setAdminData(allData);
        setIsLoader(false);
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
        <div  style={{overflow: 'scroll', height: "70%", paddingBottom: 20, paddingTop: 20}}>
        <Card
          elevation={20}
          style={{
            width: "80%",
            marginLeft: "10%",
          }}
        >
          {adminRoll !== "admin@mail.com" ? (
            isLoading ? (
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
                {Object.keys(userData)?.length > 0 ? (
                    <table className="customers" >
                      <thead>
                        <tr>
                          <th style={{ textAlign: "center" }}>Id No</th>
                          <th style={{ textAlign: "center" }}>Location</th>
                          <th style={{ textAlign: "center" }}>Slot</th>
                          <th style={{ textAlign: "center" }}>Date</th>
                          <th style={{ textAlign: "center" }}>Start Time</th>
                          <th style={{ textAlign: "center" }}>End Time</th>
                        </tr>
                      </thead>
                      {userData && Object.keys(userData)?.map((newData, i) => {
                        return ( 
                          <tr key={i}>
                            <td style={{ textAlign: "center" }}>{i}</td>
                            <td style={{ textAlign: "center" }}>
                              {toTitleCase(userData[newData].Location)}
                            </td>
                            <td style={{ textAlign: "center" }}>
                             Num of Slot {userData[newData].Slots}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {userData[newData].selectDate}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {userData[newData].StartTime}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {userData[newData].EndTime}
                            </td>
                          </tr>
                          );
                      })} 
                    </table>
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
                    <table className="customers">
                      <thead>
                        <tr>
                          <th style={{ textAlign: "center" }}>Id No</th>
                        <th style={{ textAlign: "center" }}>User Name</th>
                          <th style={{ textAlign: "center" }}>Location</th>
                          <th style={{ textAlign: "center" }}>Slot</th>
                          <th style={{ textAlign: "center" }}>Date</th>
                          <th style={{ textAlign: "center" }}>Start Time</th>
                          <th style={{ textAlign: "center" }}>End Time</th>
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
                                  {toTitleCase(adminData[data].firstName)}
                                  {adminData[data].lastName}
                                </td>
                                <td style={{ textAlign: "center" }}>
                                  {toTitleCase(adminData[data].Location)}
                                </td>
                                <td style={{ textAlign: "center" }}>
                                Num of Slot {adminData[data].Slots}
                                </td>
                                <td style={{ textAlign: "center" }}>
                                  {adminData[data].selectDate}
                                </td>
                                <td style={{ textAlign: "center" }}>
                                  {adminData[data].StartTime}
                                </td>
                                <td style={{ textAlign: "center" }}>
                                  {adminData[data].EndTime}
                                </td>
                              </tr>
                            );
                          })
                        : null}
                    </table>
                ) : <p>ddd</p>}
              </>
            )
          ) : null}
        </Card>
        </div>
      </Card>
    </div>
  );
};

export default ViewBooking;
