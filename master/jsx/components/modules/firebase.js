import firebase from 'firebase';
var firebaseConfig = {
    apiKey: "AIzaSyCBMuCtrDeAD8b7AcZykVGPoYnJrFf3Kjg",
    authDomain: "hansweb-beac1.firebaseapp.com",
    databaseURL: "https://hansweb-beac1.firebaseio.com",
    storageBucket: "hansweb-beac1.appspot.com",
};

var FbApp = firebase.initializeApp(firebaseConfig);
module.exports.FBApp = FbApp //this doesnt have to be database only