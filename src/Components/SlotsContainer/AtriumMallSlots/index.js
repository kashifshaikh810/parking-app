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
  select: {
    minWidth: 100,
    marginLeft: 10,
    backgroundColor: 'green'
  }
}));

function AtriumMall() {
  const { location } = useParams();
  const [seletedHours, setSeletedHours] = useState("");
  const [slots, setSlots] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [arr, setArr] = useState([
    {title: "Car Slot 1"},
    {title: "Car Slot 2"},
    {title: "Car Slot 3"},
    {title: "Car Slot 4"},
    {title: "Car Slot 5"},
    {title: "Car Slot 6"},
    {title: "Car Slot 7"},
  ]);
  const [selectedTime, setSeletedTime] = useState("");
  const [err, setErr] = useState("");
  const [bookSlots, setBookSlots] = useState()
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
    <div className="atriumMall">
      <Card elevation={3} className="atriumMallCard">
        <h2 className="atriumMallHead">Select Timings...</h2>
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
                labelId="demo-simple-select-label"
                value={slots}
                onChange={handleSlots}
                id="demo-simple-select-helper"
              >
                <MenuItem value="">
                  <em>Select Slot</em>
                </MenuItem>
                {arr.map((items, index) => {
                  return (
                    <MenuItem key={index} value={items.title}>{items.title}</MenuItem>
                  );
                })}
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
        { arr.map((items, index) => {
          return (
            <div key={index}
              style={{
                float: 'left',
                flexWrap: 'wrap',
                marginLeft: 10,
                marginTop: 10
              }}
            >
              <div
                style={{
                  height: "16vh",
                  width: "20vh",
                  borderRadius: "4vh",
                  backgroundColor: "#b0bec5",
                  cursor: "pointer",
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <p >{items.title}</p>
                </div>
              </div>
            </div>
          );
        })}

      </Card>
    </div>
  );
}

export default AtriumMall;
