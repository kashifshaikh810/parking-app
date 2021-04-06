import React from "react";
import "./index.css";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import firebase from "firebase/app";
import MenuIcon from "@material-ui/icons/Menu";

const DashboardHeader = ({ handleDrawerClose, handleDrawerOpen }) => {
  let history = useHistory();
  const handleLogOut = async () => {
    await firebase.auth().signOut();
    history.push("/login");
  };
  return (
    <>
      <div>
        <h1 className="myHeader">Parking Booking System</h1>
        <div className="icon">
          <MenuIcon
            style={{ color: "#f1f1f1", marginLeft: "25vh", cursor: "pointer" }}
            fontSize="large"
            onClick={handleDrawerClose || handleDrawerOpen}
          />
        </div>
        <div className="logBtn">
          <Button
            style={{ backgroundColor: "#f1f1f1" }}
            onClick={handleLogOut}
            type="submit"
            variant="outlined"
          >
            Log Out
          </Button>
        </div>
      </div>
    </>
  );
};

export default DashboardHeader;
