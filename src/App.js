import React,{useEffect, useState} from "react";
import Routing from "../src/Components/Router/index";
import firebase from 'firebase/app';
// import { makeStyles } from '@material-ui/core/styles';
// import Modal from '@material-ui/core/Modal';

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     position: 'absolute',
//     width: 400,
//     backgroundColor: theme.palette.background.paper,
//     border: '2px solid #000',
//     // boxShadow: theme.shadows[5],
//     padding: theme.spacing(2, 4, 3),
//   },
// }));

// function rand() {
//   return Math.round(Math.random() * 20) - 10;
// }

// function getModalStyle() {
//   const top = 50 + rand();
//   const left = 50 + rand();

//   return {
//     top: `${top}%`,
//     left: `${left}%`,
//     transform: `translate(-${top}%, -${left}%)`,
//   };
// }

function App() {
  // const classes = useStyles();
  // const [modalStyle] = useState(getModalStyle);
  // const [open, setOpen] = useState(true);
  const [getUser, setGetUser] = useState('');

  const userBlock = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!!user) {
        firebase.database().ref("/newUser/").child(user?.uid).on("value", (snapshot) => {
          let prop = snapshot?.val()?.block;
          setGetUser(prop);
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
 
    // const handleOpen = () => {
    //   setOpen(true);
    // };
  
    // const handleClose = () => {
    //   setOpen(false);
    // };

    // const body = (
    //   <div className={classes.paper}>
    //     <h2  style={{color: '#adad00',}} id="simple-modal-title">Warning</h2>
    //     <p style={{color: 'red', fontWeight: 'bold'}} id="simple-modal-description">
    //       Admin has blocked you,
    //     </p>
    //     <button type="button" onClick={handleClose}>
    //     Ok
    //   </button>
    //   <Modal
    //     open={open}
    //     onClose={handleOpen}
    //     aria-labelledby="simple-modal-title"
    //     aria-describedby="simple-modal-description"
    //   >
    //     {body}
    //   </Modal>
    //   </div>
    // );

    return (
    <div className="App">
      <Routing />
    {getUser === true ?  
       alert('Attention please: Admin has Blocked you,') : null}
    </div>
  );
}

export default App;
