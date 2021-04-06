import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDE_I5klkWz69QBw5Oblur7Bfyqs4oxywk",
  authDomain: "parking-app-de232.firebaseapp.com",
  databaseURL: "https://parking-app-de232-default-rtdb.firebaseio.com",
  projectId: "parking-app-de232",
  storageBucket: "parking-app-de232.appspot.com",
  messagingSenderId: "457403063286",
  appId: "1:457403063286:web:357b172cb123d9dfe805d7",
  measurementId: "G-JK23P3NPLX",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
