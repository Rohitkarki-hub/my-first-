import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyD99xrUNkDzTEM7HkXN6-bsq4bTgqI5JyE",
  authDomain: "ecommeree.firebaseapp.com",
  projectId: "ecommeree",
  storageBucket: "ecommeree.appspot.com",
  messagingSenderId: "171474704949",
  appId: "1:171474704949:web:d410ada9e695e9fba16f7c"
  };
  firebase.initializeApp(firebaseConfig);


  const auth=firebase.auth();
  const db=firebase.firestore();
  const storage=firebase.storage();


export {auth,db,storage}

