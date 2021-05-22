import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAIMbWZR3rEfpDbMM7-3kK89fVfB7y2ES0",
  authDomain: "pokemn-online.firebaseapp.com",
  projectId: "pokemn-online",
  storageBucket: "pokemn-online.appspot.com",
  messagingSenderId: "487653301458",
  appId: "1:487653301458:web:6da6e1fd3a24f02b01a10b",
};

const app = firebase.initializeApp(firebaseConfig);

const db = app.firestore();
const auth = app.auth();

export { db, auth };
