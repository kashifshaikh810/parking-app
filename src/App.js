import React,{useEffect, useState} from "react";
import Routing from "../src/Components/Router/index";
import firebase from 'firebase/app';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(true);
  const [getUser, setGetUser] = useState('');

  const userBlock = () => {
    firebase.auth().onAuthStateChanged((user) => {
      setGetUser(user);
      if (!!user) {
        firebase.database().ref("/newUser/").child(user?.uid).on("value", (snapshot) => {
          if (snapshot.val().hasOwnProperty('block')) {
            if (snapshot.val()?.block === true) {
              firebase.auth().signOut()
            };
          };
        });
      };
    });
  };

  useEffect(() => {
    userBlock()
  }, [])
 
    const handleOpen = () => {
      setOpen(false);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const body = (
      <div style={modalStyle} className={classes.paper}>
        <h2  style={{color: '#adad00',}} id="simple-modal-title">Warning</h2>
        <p style={{color: 'red', fontWeight: 'bold'}} id="simple-modal-description">
          Admin has blocked you,
        </p>
        <button type="button" onClick={handleOpen}>
        Ok
      </button>
        <App />
      </div>
    );

    return (
    <div className="App">
      <Routing />
    {/* {getUser ? <> 
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal> </> : null} */}
    </div>
  );
}

export default App;
