import React from "react";
import { useHistory } from "react-router-dom";
import { Card } from "@material-ui/core";
import "./index.css";

function OceanMall() {
  let history = useHistory();
  return (
    <div className="OceanMall">
      <Card elevation={3} className="OceanMallCard">
        <h2 className="OceanMallHead">Selecte Timings...</h2>
      </Card>
    </div>
  );
}

export default OceanMall;
