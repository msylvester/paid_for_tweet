import React from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import FacebookButton  from '../Layout/FacebookButton';
import { Grid, Row, Col, Dropdown, MenuItem } from 'react-bootstrap';
import Firebase from 'firebase';
import ReactDOM from 'react-dom';
import { Router, Route, Link, hashHistory, browserHistory, IndexRoute } from 'react-router';

class Main extends React.Component {

  constructor() {
    super()
    
    this.state =  {

      login: false

    }

  }

  componentWillMount() {
        
       // var that = this;







  }

  componentDidMount(){ 
    //events 
   FB.Event.subscribe('auth.authResponseChange', checkLoginState);



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
 
                    FB.api('/me/accounts', function(response) {

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
      browserHistory.push('/')
      this.firebase.auth().signOut();
        browserHistory.push('/')
    }
  }







  componentWillUnMount() {
    //cancel subsription 
    FB.Event.unsubscribe(event, checkLoginState)

    //'auth.authResponseChange', checkLoginState

  }

//render login if I am not login 

    render() {
    {/*here we aer going to see if the user is logged in, if they are, we want to go to project*/}
      if (this.state.login) {
        return(<Link to="/singleview"/ login={this.state.login}>)

      }

        return(<Link to="/login" login={this.state.login}>);


    }
}

export default Main;