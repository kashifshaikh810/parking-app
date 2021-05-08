import React,{useEffect, useState} from "react";
import { useHistory } from "react-router-dom";
import { Card, CircularProgress } from "@material-ui/core";
import { Launch } from "@material-ui/icons";
import "./index.css";
import firebase from "firebase";

function BookParking() {
  let history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [getData, setGetData] = useState([])

  const goToAtriumMall = (item, index) => {
    let slots = item.slots
    history.push(`/atriummall/${item.location}/${item.slots}/${item.booked}/${localStorage.setItem('slots', slots)}`);
  };

  useEffect(() => {
    setIsLoading(true)
    firebase.database().ref('/locations/').on('value', (snapshot) => {
      let data = snapshot.val() ? Object.values(snapshot.val()) : [];
      setGetData(data)
      setTimeout(() => {
        setIsLoading(false)
      }, 1500);
    })
  },[window.location.pathname])
  
  return (
    <div className="bookParking">
      <Card elevation={3} className="parkingCard">
        <h2 className="parkingHeading">Select the favourite Parking Area</h2>
        <div style={{overflow: 'scroll', height: "70%", marginBottom: 10}}>
          {Object.keys(getData).length > 0 ?
             isLoading ? (
              <div style={{display: 'flex', justifyContent: 'center', alignItems: "center", height: '48vh'}}>
                <CircularProgress color="secondary" />
              </div>
            ) : (
              getData?.map((item, index) => {
                return(
                  <Card elevation={12} style={{width: '95%', margin: 20, marginTop: 10, height: '10vh'}}>
                  <div className="main">  
                  <div className="para">
                    <p className="paraParent">Name :</p>
                    <p className="paraChild">{item.location}</p>
                  </div>
                  <div className="para">
                    <p className="paraParent"> Address :</p>
                    <p className="paraChild">{item.address}</p>
                  </div>
                      <div 
       style={{position: 'relative', left: '90%', top: -42, bottom: 0, right: 0,
        width: 40, height: 40, backgroundColor: '#c2185b', display: 'flex', justifyContent: 'center', alignItems: 'center',
        borderRadius: 20, cursor: 'pointer'
      }}
       onClick={() => goToAtriumMall(item, index)}>
                        <Launch style={{color: '#f1f1f1'}}/>
                      </div>
                </div>
                </Card>
              );
              })
            )
          : isLoading ? <div style={{display: 'flex', justifyContent: 'center', alignItems: "center", height: '48vh'}}>
          <CircularProgress color="secondary" />
        </div>
          :
          <h3 style={{textAlign: 'center', fontWeight: 'bold'}}>Admin No Locations Added</h3>
          }
        </div>
      </Card>
    </div>
  );
}

export default BookParking;