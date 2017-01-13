import firebase from 'firebase';

  // Initialize Firebase
  const config = {
    apiKey: "AIzaSyCBMuCtrDeAD8b7AcZykVGPoYnJrFf3Kjg",
    authDomain: "hansweb-beac1.firebaseapp.com",
    databaseURL: "https://hansweb-beac1.firebaseio.com",
    storageBucket: "hansweb-beac1.appspot.com",
    messagingSenderId: "548523080497"
  };

firebase.initializeApp(config);

var provider = new firebase.auth.FacebookAuthProvider();

var auth = firebase.auth();
var currentUserAuth = auth.currentUser;
var databaseRef = firebase.database();
var storageRef = firebase.storage().ref();



const credentials = {
    PROVIDER : provider,
    AUTH : auth,
    CURRENTUSERAUTH : currentUserAuth,
    DATABASEREF : databaseRef,
    STORAGEREF : storageRef

};


export default credentials;
