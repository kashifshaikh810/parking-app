import React from "react";
import { useHistory } from "react-router-dom";
import { Card } from "@material-ui/core";
import "./index.css";

function DolmenMall() {
  let history = useHistory();
  return (
    <div className="DolmenMall">
      <Card elevation={3} className="DolmenMallCard">
        <h2 className="DolmenMallHead">Selecte Timings...</h2>
      </Card>
    </div>
  );
}

export default DolmenMall;
