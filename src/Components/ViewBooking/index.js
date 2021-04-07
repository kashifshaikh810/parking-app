import React from "react";
import { Card, Paper } from "@material-ui/core";
import "./index.css";

const ViewBooking = () => {
  return (
    <div className="viewBooking">
      <Card elevation={3} className="card">
        <div className="align">
          <h2 className="header">Bookings</h2>
        </div>
      </Card>
    </div>
  );
};

export default ViewBooking;
