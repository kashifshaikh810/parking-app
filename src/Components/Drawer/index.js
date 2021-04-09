import React from "react";
import DashboardHeader from "../DashboardHeader/index";
import { Drawer, List, ListItem, ListItemText } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 200,
  },
  item: {
    borderBottom: "1px solid #b3b3b3",
    paddingBottom: "13px",
    marginTop: "4vh",
    fontVariantCaps: "small-caps",
    fontWeight: "bold",
    color: "#b3b3b3",
  },
}));

const DrawerHome = () => {
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const parkingHandler = () => {
    history.push("/bookparking");
    setOpen(false);
  };

  const bookHandler = () => {
    history.push("/viewbooking");
    setOpen(false);
  };

  const feedHandler = () => {
    history.push("/feedback");
    setOpen(false);
  };

  return (
    <>
      <DashboardHeader setOpen={setOpen} />
      <Drawer open={open} onClose={() => setOpen(false)}>
        <List disablePadding className={classes.drawer}>
          <ListItem button>
            <ListItemText
              primary="Book Parking"
              onClick={parkingHandler}
              className={classes.item}
            />
          </ListItem>
          <ListItem button>
            <ListItemText
              onClick={bookHandler}
              primary="View Booking"
              className={classes.item}
            />
          </ListItem>

          <ListItem button>
            <ListItemText
              onClick={feedHandler}
              primary="FeedBack"
              className={classes.item}
            />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default DrawerHome;
