import React,{useEffect, useState} from "react";
import { useHistory } from "react-router-dom";
import { Card, CircularProgress } from "@material-ui/core";
import { Launch } from "@material-ui/icons";
import "./index.css";
import firebase from "firebase";

function BookParking() {
  let history = useHistory();
  const [isLoading, setIsLoading] = useState(false)
  const [getData, setGetData] = useState([])

  const goToAtriumMall = (item, index) => {
    history.push(`/atriummall/${item.location}/${index}`);
  };

  // const goToDolmenMall = () => {
  //   history.push("/dolmenmall/DolmenMall");
  // };

  // const goToOceanMall = () => {
  //   history.push("/oceanmall/OceanMall");
  // };

  useEffect(() => {
    setIsLoading(true)
    firebase.database().ref('/locations/').on('value', (snapshot) => {
      let data = snapshot.val() ? Object.values(snapshot.val()) : [];
      setGetData(data)
      setIsLoading(false)
    })
  },[isLoading])

  return (
    <div className="bookParking">
      <Card elevation={3} className="parkingCard">
        <h2 className="parkingHeading">Select the your favourite Parking Area</h2>
        <div style={{overflow: 'scroll', height: "70%", marginBottom: 10}}>
          {Object.keys(getData).length > 0 ?
             isLoading ? (
              <div style={{display: 'flex', justifyContent: 'center', alignItems: "center", height: '48vh'}}>
                <CircularProgress color="secondary" />
              </div>
            ) : (
              getData?.map((item, index) => {
                return(
                  <div className="main">
                  <div className="para">
                    <p className="paraParent">Name :</p>
                    <p className="paraChild">{item.location}</p>
                  </div>
                  <div className="para">
                    <p className="paraParent"> Address :</p>
                    <p className="paraChild">{item.address}</p>
                    <div className="iconContainer">
                      <div className="content" onClick={() => goToAtriumMall(item, index)}>
                        <Launch className="myIcon" />
                      </div>
                    </div>
                  </div>
                </div>
              );
              })
            )
          : <h3 style={{textAlign: 'center', fontWeight: 'bold'}}>Admin No Locations Added</h3>
          }
       

        {/* <div className="main">
          <div className="para">
            <p className="paraParent">Name :</p>
            <p className="paraChild">Dolmen Mall</p>
          </div>
          <div className="para">
            <p className="paraParent">Address :</p>
            <p className="paraChild">Clifton</p>
            <div
              style={{
                position: "absolute",
                top: "54%",
                left: "85%",
                right: 0,
                bottom: 0,
              }}
            >
              <div className="content" onClick={goToDolmenMall}>
                <Launch className="myIcon" />
              </div>
            </div>
          </div>
        </div>

        <div className="main">
          <div className="para">
            <p className="paraParent">Name :</p>
            <p className="paraChild">Ocean Mall</p>
          </div>
          <div className="para">
            <p className="paraParent">Address :</p>
            <p className="paraChild">Clifton, Teen Talwar</p>
            <div
              style={{
                position: "absolute",
                top: "70%",
                left: "85%",
                right: 0,
                bottom: 0,
              }}
            >
              <div className="content" onClick={goToOceanMall}>
                <Launch className="myIcon" />
              </div>
            </div>
          </div>
        </div> */}
        </div>
      </Card>
    </div>
  );
}

export default BookParking;
