import React from 'react';

//import FBApp from '../modules/firebase';





export default class FacebookButton extends React.Component {
   constructor(props) {
      super(props);
      console.log(props.fb);
      //this.FB = props.fb;
      console.log("in constructor")
      this.state = {
         message: ""
      };


   }



   componentDidMount() {
      console.log("component did mount")
      FB.Event.subscribe('auth.logout', 
         this.onLogout.bind(this));
      FB.Event.subscribe('auth.statusChange', 
         this.onStatusChange.bind(this));
      FB.Event.subscribe('auth.authResponseChange', this.checkLoginState.bind(this));
   }
      
   onStatusChange(response) {
 
      var self = this;

      if( response.status === "connected" ) {
         this.FB.api('/me', function(response) {
            var message = "Welcome " + response.name;
            self.setState({
               message: message
            });
         })
      }
   }

   onLogout(response) {
      this.setState({
         message: ""
      });
   }


checkLoginState(event) {
   console.log("made it to event")
   console.log(event)
  if (event.authResponse!=null) {
    // User is signed-in Facebook.
    var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      console.log("in this block")
      console.log(firebaseUser)


      var check = false;

        if (firebaseUser) {
    var providerData = firebaseUser.providerData;
    for (var i = 0; i < providerData.length; i++) {
      if (providerData[i].providerId === firebase.auth.FacebookAuthProvider.PROVIDER_ID &&
          providerData[i].uid === event.authResponse.userID) {
        // We don't need to re-auth the Firebase connection.
        check = true;
      }
    }
  }
  console.log("this didnt crash");
  console.log(check);


      if (!check) {
        // Build Firebase credential with the Facebook auth token.

        console.log("this shoudl be a hit")

        var credential = firebase.auth.FacebookAuthProvider.credential(
            event.authResponse.accessToken);
        // Sign in with the credential from the Facebook user.
        firebase.auth().signInWithCredential(credential).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorMessage)
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
      } else {
        // User is already signed-in Firebase with the correct user.
      }
    });
  } else {
    // User is signed-out of Facebook.
    console.log("loggin user out")
    this.firebase.auth().signOut();
  }
}


isUserEqual(facebookAuthResponse, firebaseUser) {

console.log('in user')
console.log(firebaseUser)

  if (firebaseUser) {
    var providerData = firebaseUser.providerData;
    for (var i = 0; i < providerData.length; i++) {
      if (providerData[i].providerId === firebase.auth.FacebookAuthProvider.PROVIDER_ID &&
          providerData[i].uid === facebookAuthResponse.userID) {
        // We don't need to re-auth the Firebase connection.
        return true;
      }
    }
  }
  return false;
}

   render() {
      return (
         <div>
            <div 
               className="fb-login-button" 
               data-max-rows="1" 
               data-size="xlarge" 
               data-show-faces="false" 
               scope="public_profile,email"
               data-auto-logout-link="true"
               >
            </div>
            <div>{this.state.message}</div>
         </div>
      );
   }
};