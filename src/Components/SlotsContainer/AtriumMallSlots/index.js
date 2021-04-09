import React from "react";
import {
  Card,
  TextField,
  FormControl,
  Select,
  MenuItem,
} from "@material-ui/core";
import "./index.css";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

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

function AtriumMall() {
  const [age, setAge] = React.useState("");
  const [slots, setSlots] = React.useState("");
  const classes = useStyles();

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handle = (event) => {
    setSlots(event.target.value);
  };

  return (
    <div className="atriumMall">
      <Card elevation={3} className="atriumMallCard">
        <h2 className="atriumMallHead">Select Timings...</h2>
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
            <FormControl className={classes.formControl} color="secondary">
              <Select
                className={classes.selectEmpty}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <p style={{ marginLeft: 15, cursor: "pointer" }} value={1}>
                  1 hours
                </p>
                <p style={{ marginLeft: 15, cursor: "pointer" }} value={2}>
                  2 hours
                </p>
                <p style={{ marginLeft: 15, cursor: "pointer" }} value={3}>
                  3 hours
                </p>
                <p style={{ marginLeft: 15, cursor: "pointer" }} value={4}>
                  4 hours
                </p>
              </Select>
            </FormControl>
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
                onChange={handle}
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
              </Select>
            </FormControl>
          </div>
        </form>
        <div style={{ marginLeft: 15 }}>
          <p style={{ fontWeight: "bold", color: "red" }}>
            Please select the Date & Time & Hours first -- Then Click on the
            Book Slot button
          </p>
        </div>

        <div style={{ marginLeft: 15 }}>
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
              marginTop: 20,
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
        </div>
      </Card>
    </div>
  );
}

export default AtriumMall;
