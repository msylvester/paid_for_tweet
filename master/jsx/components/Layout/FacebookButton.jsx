import React from 'react';
import { Router, Route, Link, hashHistory, browserHistory, IndexRoute } from 'react-router';
//import FBApp from '../modules/firebase';



/*
FacebookButton connects user to authentication via Facebook and firebase


*/

export default class FacebookButton extends React.Component {
   

   constructor(props) {
      super(props);
      //whats inside prps
      console.log(props);

   }

   componentDidMount() {

      FB.Event.subscribe('auth.logout', 
         this.onLogout.bind(this));
      FB.Event.subscribe('auth.statusChange', 
         this.onStatusChange.bind(this));



      FB.Event.subscribe('auth.authResponseChange', this.checkLoginState.bind(this));

     } 
   onStatusChange(response) {
 
      var self = this;

      if( response.status === "connected" ) {
         FB.api('/me', function(response) {
            var message = "Welcome " + response.name;
            console.log(message)
            // self.setState({
            //    message: message
            // });
         })
      }
   }

   onLogout(response) {

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

        //see if the user is logged 
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

                // //first time user 
                // if (firebase.database().ref('users/' + event.authResponse.accessToken) === null) {
                
     
                    FB.api('/me/accounts', function(response) {
                      console.log("about to log response");
                      console.log(response);
                      var pages = [];
                      var page_names = {};
                      for (var i =0; i<response.data.length; i++) {
                          var a = { 
                              page_name:response.data[i].name,
                              page_token:response.data[i].access_token

                          }
                          page_names[response.data[i].name] = response.data[i].access_token;
                         
                          pages.push(a);
                      }


                      firebase.database().ref('users/' + event.authResponse.userID).set({

                          uid:event.authResponse.userID,
                          bot_connected:false,
                          credential:event.authResponse.accessToken,
                          pages:  page_names,
                          messenger_token: ""


                          
                    })




                    })
            
                


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
                console.log("gere i a me in the this shit");
                 
                    FB.api('/me/accounts', function(response) {
                      console.log("about to log response");
                      console.log(response);
                      var pages = [];
                      var page_names = {};
                      for (var i =0; i<response.data.length; i++) {
                          var a = { 
                              page_name:response.data[i].name,
                              page_token:response.data[i].access_token

                          }
                          page_names[response.data[i].name] = response.data[i].access_token;
                         
                          pages.push(a);
                      }

                      console.log("about to log push");
                      console.log("da fuq");
                      firebase.database().ref('users/' + event.authResponse.userID).set({

                          uid:event.authResponse.userID,
                          bot_connected:false,
                          credential:event.authResponse.accessToken,
                          pages:  page_names 

                          
                    })




                    })
                   browserHistory.push('/singleview');

                // User is already signed-in Firebase with the correct user.
              }
            });
    } else {
      // User is signed-out of Facebook.
      console.log("loggin user out");
      this.firebase.auth().signOut();

    }
  }




   render() {
      console.log("i need ro render button");
      return (
         <div>
            <p>helll</p>



            <div 
               className="fb-login-button" 
               data-max-rows="1" 
               data-size="xlarge" 
               data-show-faces="false" 
               scope="public_profile,email, manage_pages, publish_pages"
               data-auto-logout-link="true"
               >
            </div>
            {  FB.XFBML.parse()}

         </div>

      );
   }
};