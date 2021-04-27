import React, {useEffect, useState} from 'react';
import './index.css'
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
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [errMyMsg, setErrMyMsg] = useState("");
  const [success, setSuccess] = useState("");
  const [slots, setSlots] = useState("");
  const [slotItems, setslotItems] = useState([{title: 'num of Slots 1'}, {title: 'num of Slots 2'}, {title: 'num of Slots 3'}, {title: 'num of Slots 4'}, {title: 'num of Slots 5'}, {title: 'num of Slots 6'}, {title: 'num of Slots 7'}, {title: 'num of Slots 8'}, {title: 'num of Slots 9'}, {title: 'num of Slots 10'}, {title: 'num of Slots 12'}, {title: 'num of Slots 13'}, {title: 'num of Slots 14'}, {title: 'num of Slots 15'}]);
  const classes = useStyles();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (location && address && slots) {
        firebase.database().ref('/locations/').push({location: location, address: address, slots: slots})
        setSuccess("Data Successfully Added")
        setLocation('')
        setAddress('')
        setSlots('')
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
                {
                    slotItems.map((item) => {
                        return(
                            <MenuItem value={item.title}><span style={{ cursor: "pointer" }}>{item.title}</span> </MenuItem>
                        )
                    })
                }
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