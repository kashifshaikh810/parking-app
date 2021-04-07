import React from "react";
import { Card } from "@material-ui/core";
import "./index.css";
import { Launch } from "@material-ui/icons";

function BookParking() {
  return (
    <div className="bookParking">
      <Card elevation={3} className="parkingCard">
        <h2 className="parkingHeading">Selected Parking Area</h2>
        <div className="main">
          <div className="para">
            <p className="paraParent">Name :</p>
            <p className="paraChild">Atrium Mall</p>
          </div>
          <div className="para">
            <p className="paraParent"> Address :</p>
            <p className="paraChild"> Sadar, Abdullah Haroon Road</p>
            <div className="iconContainer">
              <div className="content">
                <Launch className="myIcon" />
              </div>
            </div>
          </div>
        </div>

        <div className="main">
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
              <div className="content">
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
              <div className="content">
                <Launch className="myIcon" />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default BookParking;
