import React from "react";
import DashboardHeader from "../Dashboard/DashboardHeader/index";
import {
  Drawer as MUIDrawer,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
}));

const Drawer = (props) => {
  const { history } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const itemsList = [
    {
      text: "Book Parking",
      onClick: () => history.push("/dashboard"),
    },
    {
      text: "Home",
      onClick: () => history.push("/"),
    },
  ];

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <DashboardHeader
        handleDrawerClose={handleDrawerClose}
        handleDrawerOpen={handleDrawerOpen}
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      />
      <MUIDrawer
        open={open}
        className={classes.drawer}
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <List style={{ width: 180 }}>
          {itemsList.map((item, index) => {
            const { text, onClick } = item;
            return (
              <ListItem button key={text} onClick={onClick}>
                <ListItemText primary={text} />
              </ListItem>
            );
          })}
        </List>
      </MUIDrawer>
    </>
  );
};

export default withRouter(Drawer);
