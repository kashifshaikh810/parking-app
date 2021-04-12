import React, { useState } from "react";
import {
  Card,
  TextField,
  FormControl,
  Select,
  MenuItem,
} from "@material-ui/core";
import "./index.css";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import firebase from "firebase/app";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  formControl: {
    minWidth: 80,
    marginTop: theme.spacing(0.3),
    marginLeft: theme.spacing(1),
  },
}));

function OceanMall() {
  const { location } = useParams();
  const [seletedHours, setSeletedHours] = useState("");
  const [slots, setSlots] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSeletedTime] = useState("");
  const [err, setErr] = useState("");
  const classes = useStyles();

  const handleHours = (event) => {
    setSeletedHours(event.target.value);
    setErr("");
  };

  const handleSlots = (event) => {
    setSlots(event.target.value);
    setErr("");
  };

  const handleDate = (event) => {
    setSelectedDate(event.target.value);
    setErr("");
  };

  const handleTime = (event) => {
    setSeletedTime(event.target.value);
    setErr("");
  };

  const handleSubmit = () => {
    if (seletedHours && slots && selectedDate && selectedTime) {
      let uid = firebase.auth()?.currentUser?.uid;
      console.log(selectedTime, seletedHours, selectedDate, slots, location);
      firebase.database().ref(`/bookings/${uid}`).push({
        selectDate: selectedDate,
        StartTime: selectedTime,
        Location: location,
        EndTime: seletedHours,
        Slots: slots,
      });
      setSeletedHours("");
      setSlots("");
      setSeletedTime("");
      setSelectedDate("");
      alert("Your Data Is Submit Us...");
    } else {
      setErr(
        "Please select the | Date | Time | Hours | Slot | first -- Then Click on the Book Slot button"
      );
    }
  };

  return (
    <div className="OceanMall">
      <Card elevation={3} className="OceanMallCard">
        <h2 className="OceanMallHead">Select Timings...</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              width: "20%",
              borderBottom: "1px solid #b3b3b3",
              marginBottom: 15,
            }}
          >
            <h2 className="locationHead">Your Location :</h2>
            <p style={{ marginLeft: 7 }}>{location}</p>
          </div>
        </div>
        <form className={classes.container} noValidate>
          <label
            style={{
              fontWeight: "bold",
              marginTop: 10,
              fontSize: "15px",
              marginLeft: 17,
            }}
          >
            Select Date :
          </label>
          <TextField
            color="secondary"
            id="date"
            type="date"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            value={selectedDate}
            onChange={handleDate}
          />

          <label
            style={{
              fontWeight: "bold",
              marginTop: 10,
              fontSize: "15px",
              marginLeft: 17,
            }}
          >
            Start Time :
          </label>
          <TextField
            color="secondary"
            id="time"
            type="time"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            value={selectedTime}
            onChange={handleTime}
          />
          <label
            style={{
              fontWeight: "bold",
              marginTop: 10,
              fontSize: "15px",
              marginLeft: 17,
            }}
          >
            End Time :
          </label>
          <div>
            <TextField
              color="secondary"
              id="time"
              type="time"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              value={seletedHours}
              onChange={handleHours}
            />
          </div>

          <label
            style={{
              fontWeight: "bold",
              marginTop: 10,
              fontSize: "15px",
              marginLeft: 17,
            }}
          >
            Slots :
          </label>
          <div>
            <FormControl className={classes.formControl} color="secondary">
              <Select
                className={classes.selectEmpty}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={slots}
                onChange={handleSlots}
              >
                <MenuItem>
                  <em>Select Slot</em>
                </MenuItem>
                <p style={{ marginLeft: 15, cursor: "pointer" }} value={1}>
                  Slot 1
                </p>
                <p style={{ marginLeft: 15, cursor: "pointer" }} value={2}>
                  Slot 2
                </p>
                <p style={{ marginLeft: 15, cursor: "pointer" }} value={3}>
                  Slot 3
                </p>
                <p style={{ marginLeft: 15, cursor: "pointer" }} value={4}>
                  Slot 4
                </p>
                <p style={{ marginLeft: 15, cursor: "pointer" }} value={3}>
                  Slot 5
                </p>
                <p style={{ marginLeft: 15, cursor: "pointer" }} value={4}>
                  Slot 6
                </p>
                <p style={{ marginLeft: 15, cursor: "pointer" }} value={4}>
                  Slot 7
                </p>
                <p style={{ marginLeft: 15, cursor: "pointer" }} value={4}>
                  Slot 8
                </p>
                <p style={{ marginLeft: 15, cursor: "pointer" }} value={4}>
                  Slot 9
                </p>
              </Select>
            </FormControl>
          </div>
        </form>
        <div style={{ marginLeft: 15 }}>
          <p style={{ fontWeight: "bold", color: "red", textAlign: "center" }}>
            {err}
          </p>
        </div>

        <div style={{ marginLeft: 15 }} onClick={handleSubmit}>
          <Button variant="contained">Book Slot</Button>
        </div>

        <div style={{ marginLeft: 15, marginTop: 20 }}>
          <p
            style={{
              fontWeight: "bold",
              fontSize: 25,
              borderBottom: "1px solid #b3b3b3",
              paddingBottom: 5,
              width: "97%",
            }}
          >
            View Slots
          </p>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              height: "16vh",
              width: "20vh",
              borderRadius: "4vh",
              backgroundColor: "#b0bec5",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <p style={{ marginTop: "35%" }}>Car Slot 1</p>
            </div>
          </div>

          <div
            style={{
              height: "16vh",
              width: "20vh",
              borderRadius: "4vh",
              backgroundColor: "#b0bec5",
              marginLeft: 10,
              cursor: "pointer",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <p style={{ marginTop: "35%" }}>Car Slot 2</p>
            </div>
          </div>

          <div
            style={{
              height: "16vh",
              width: "20vh",
              borderRadius: "4vh",
              backgroundColor: "#b0bec5",
              marginLeft: 10,
              cursor: "pointer",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <p style={{ marginTop: "35%" }}>Car Slot 3</p>
            </div>
          </div>

          <div
            style={{
              height: "16vh",
              width: "20vh",
              borderRadius: "4vh",
              backgroundColor: "#b0bec5",
              marginLeft: 10,
              cursor: "pointer",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <p style={{ marginTop: "35%" }}>Car Slot 4</p>
            </div>
          </div>

          <div
            style={{
              height: "16vh",
              width: "20vh",
              borderRadius: "4vh",
              backgroundColor: "#b0bec5",
              marginLeft: 10,
              cursor: "pointer",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <p style={{ marginTop: "35%" }}>Car Slot 5</p>
            </div>
          </div>

          <div
            style={{
              height: "16vh",
              width: "20vh",
              borderRadius: "4vh",
              backgroundColor: "#b0bec5",
              marginLeft: 10,
              cursor: "pointer",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <p style={{ marginTop: "35%" }}>Car Slot 6</p>
            </div>
          </div>

          <div
            style={{
              height: "16vh",
              width: "20vh",
              borderRadius: "4vh",
              backgroundColor: "#b0bec5",
              marginLeft: 10,
              marginTop: 10,
              cursor: "pointer",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <p style={{ marginTop: "35%" }}>Car Slot 7</p>
            </div>
          </div>

          <div
            style={{
              height: "16vh",
              width: "20vh",
              borderRadius: "4vh",
              backgroundColor: "#b0bec5",
              marginLeft: 10,
              marginTop: 10,
              cursor: "pointer",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <p style={{ marginTop: "35%" }}>Car Slot 8</p>
            </div>
          </div>

          <div
            style={{
              height: "16vh",
              width: "20vh",
              borderRadius: "4vh",
              backgroundColor: "#b0bec5",
              marginLeft: 10,
              marginTop: 10,
              cursor: "pointer",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <p style={{ marginTop: "35%" }}>Car Slot 9</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default OceanMall;
