import React, {useEffect, useState} from 'react';
import './index.css'
import {useHistory} from 'react-router-dom';
import { Card, Input, Button, FormControl, Select, MenuItem } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import firebase from "firebase";

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

const AddLocations = () => {
  let history = useHistory()
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [errMyMsg, setErrMyMsg] = useState("");
  const [success, setSuccess] = useState("");
  const [slots, setSlots] = useState("");
  const classes = useStyles();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (location && address && slots) {
        firebase.database().ref('/locations/').push({location: location, address: address, slots: slots, booked: false})
        setSuccess("Data Successfully Added")
        setLocation('')
        setAddress('')
        setSlots('')
        history.push('/viewaddlocations')
    } else {
      setErrMyMsg("All Fields Are Required");
    }
  };

  const handleSlots = (event) => {
    setSlots(event.target.value);
    setErrMyMsg("");
    setSuccess('')
  };

  const locationHandleChange = (event) => {
    setLocation(event.target.value);
    setErrMyMsg("");
    setSuccess('')
  };

  const addressHandleChange = (event) => {
    setAddress(event.target.value);
    setErrMyMsg("");
    setSuccess('')
  };

  useEffect(() => {
    setLocation("");
    setAddress("");
    setErrMyMsg("");
    setSlots('')
    setSuccess('')
  }, []);

  console.log(slots)

    return(
        <div style={{display: 'flex', justifyContent: 'center', backgroundColor: 'rgb(48, 48, 48)', height: '90.5vh'}}>
            <Card elevation={20} style={{width: '80%', height: '80vh', textAlign: 'center', marginTop: 36, }}>
            <h1>Add Locations</h1>
          <form autoComplete="on" onSubmit={(event) => handleSubmit(event)}>
            <div className="emailInput">
              <div className="input">
                <Input
                  type="text"
                  placeholder="Location"
                  value={location}
                  onChange={(event) => locationHandleChange(event)}
                  required
                />
              </div>
            </div>
            <div>
              <div className="input">
                <Input
                  type="text"
                  placeholder="Address"
                  value={address}
                  onChange={(event) => addressHandleChange(event)}
                  required
                />
              </div>
            </div>

          <div>
            <FormControl className={classes.formControl} color="primary">
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
                <MenuItem value={1}><span style={{ cursor: "pointer" }}></span>num of Slots 1</MenuItem>
                <MenuItem value={2}><span style={{ cursor: "pointer" }}></span>num of Slots 2</MenuItem>
                <MenuItem value={3}><span style={{ cursor: "pointer" }}></span>num of Slots 3</MenuItem>
                <MenuItem value={4}><span style={{ cursor: "pointer" }}></span>num of Slots 4</MenuItem>
                <MenuItem value={5}><span style={{ cursor: "pointer" }}></span>num of Slots 5</MenuItem>
                <MenuItem value={6}><span style={{ cursor: "pointer" }}></span>num of Slots 6</MenuItem>
                <MenuItem value={7}><span style={{ cursor: "pointer" }}></span>num of Slots 7</MenuItem>
                <MenuItem value={8}><span style={{ cursor: "pointer" }}></span>num of Slots 8</MenuItem>
                <MenuItem value={9}><span style={{ cursor: "pointer" }}></span>num of Slots 9</MenuItem>
                <MenuItem value={10}><span style={{ cursor: "pointer" }}></span>num of Slots 10</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div>
              <div style={{ textAlign: "center", color: "green", fontWeight: 'bold' }}>
                <p>{success}</p>
                </div>
              <div style={{ textAlign: "center", color: "red", fontWeight: 'bold' }}>
                <p>{errMyMsg}</p>
                </div>
              <div className="btn">
                <Button type="submit" variant="outlined" color="primary">
                  Add
                </Button>
              </div>
            </div>
          </form>
            </Card>
            </div>
    )
}

export default AddLocations;