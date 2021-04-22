import React, { useState, useEffect } from "react";
import {
  Card,
  TextField,
} from "@material-ui/core";
import "./index.css";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import firebase from "firebase/app";
import moment from 'moment';  

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

var format = 'hh:mm:ss';

function AtriumMall() {
  const { location } = useParams();
  const [seletedHours, setSeletedHours] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [arr, setArr] = useState([
    {title: "Car Slot 1", booked: false},
    {title: "Car Slot 2", booked: false},
    {title: "Car Slot 3", booked: false},
    {title: "Car Slot 4", booked: false},
    {title: "Car Slot 5", booked: false},
    {title: "Car Slot 6", booked: false},
    {title: "Car Slot 7", booked: false},
  ]);
  const [selectedTime, setSeletedTime] = useState("");
  const [hideSlot, setHideSlot] = useState(false);
  const [err, setErr] = useState("");
  const classes = useStyles();
  const [bookSuccess, setBookSuccess] = useState("");

  useEffect(() => {
    firebase.database().ref('/bookings/').on('value', (snapshot) => {
      let snap = snapshot.val() ? Object.values(snapshot.val()) : []
      let data = Object.values(snap)
      let shot = [];

      data.forEach((item, i) => {
        shot = [...Object.values(item), ...shot];
      });
      
      let newData = {};

      arr.forEach((prevSlots) => {
        var bookings = shot.filter(booked => booked.Slots === prevSlots.title);
        var found = false;

        for(let i = 0; i< bookings.length; i++) {
          let booked = bookings[i];
          let time = moment(`${selectedTime}:00`, format);
          let endTime = moment(`${seletedHours}:00`, format);
          let beforeTime = moment(`${booked.StartTime}:00`, format);
          let afterTime = moment(`${booked.EndTime}:00`, format);
          if(booked.selectDate === selectedDate && (time.isBetween(beforeTime, afterTime) || endTime.isBetween(beforeTime, afterTime))){ 
            found = true;
            break;
          }else {
            found = false;
          }
        }
        newData[prevSlots.title] = { ...prevSlots, booked: found };
      });

      setArr(Object.values(newData));

    });
  },[location, selectedDate, selectedTime, seletedHours])

  const handleHours = (event) => {
    setSeletedHours(event.target.value);
    setErr("");
    setBookSuccess('')
  };

  const handleDate = (event) => {
    setSelectedDate(event.target.value);
    setErr("");
    setBookSuccess('')
  };

  const handleTime = (event) => {
    setSeletedTime(event.target.value);
    setBookSuccess('')
    setErr("")
  };

  const handleVerify = () => {
    let date = new Date();
    let userDate = new Date(selectedDate)
    if(userDate.getTime() >=  date.getTime() && seletedHours > selectedTime ){
      setHideSlot(true)
    }else{
      alert('select the valid date & time')
      setHideSlot(false)
    }
  };

     const handleSubmit = (items) => {
      if (seletedHours && selectedDate && selectedTime) {
        let uid = firebase.auth()?.currentUser?.uid;
        let slots = items.title
        firebase.database().ref(`/bookings/${uid}`).push({
          selectDate: selectedDate,
          StartTime: selectedTime,
          Location: location,
          EndTime: seletedHours,
          Slots: slots,
        });
        setSeletedHours("");
        setSeletedTime("");
        setSelectedDate("");
        setHideSlot(false)
        setBookSuccess('Booked Successfully')
      } else {
        setErr(
          "Please select the | Date | Start Time | End Time | first -- Then Click on the Book Slot button"
        );
      }
     } 
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
         
        </form>
        <div style={{ marginLeft: 15 }}>
          <p style={{ fontWeight: "bold", color: "red", textAlign: "center" }}>
            {err}
          </p>
        </div>

        <div style={{ marginLeft: 15 }} onClick={handleVerify}>
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
            View Available Slots
          </p>
        </div>
        {
        hideSlot ? arr.map((items, index) => {
          return (
            <div key={index} onClick={() => !items.booked && handleSubmit(items)} 
              style={{
                float: 'left',
                flexWrap: 'wrap',
                marginLeft: 10,
                marginTop: 10
              }}
            >
              <div
                style={items.booked ? {
                  height: "16vh",
                  width: "20vh",
                  borderRadius: "4vh",
                  backgroundColor: "red",
                  cursor: "not-allowed",
                  display: 'flex',
                  justifyContent: 'center'
                } :{
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
                  // className={slotVal === selectedDate ? "book" : ''}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <p>{items.title}</p>
                </div>
              </div>
            </div>
          );
        })
      : 
 !bookSuccess ?
     <h1 style={{fontWeight: 'bold', textAlign: 'center'}}>Please Choose the valid date & time then view available slots</h1> : ''
    }
      <h1 style={{textAlign: 'center', color: 'green', fontWeight: 'bold'}}>{bookSuccess}</h1>
      </Card>
    </div>
  );
}

export default AtriumMall;
