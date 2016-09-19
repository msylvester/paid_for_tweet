import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Header from './Header'
import Sidebar from './Sidebar'
import Offsidebar from './Offsidebar'
import Footer from './Footer'
import Login from '../Login/Login'

class Base extends React.Component {

    constructor() { 
        super();
      
        this.state = { 

            login:false 

        }

        console.log("is it here")
        this.checkLoginState = this.checkLoginState.bind(this);
    }

    componentWillMount() { 
        var that = this;

        FB.getLoginStatus(function(response) {
          if (response.status === 'connected') {
            // the user is logged in and has authenticated your
            // app, and response.authResponse supplies
            // the user's ID, a valid access token, a signed
            // request, and the time the access token 
            // and signed request each expire
            var uid = response.authResponse.userID;
            var accessToken = response.authResponse.accessToken;

            console.log('connected' + uid)


            that.setState(  {

              login: true


            })

          } else if (response.status === 'not_authorized') {
            // the user is logged in to Facebook, 
            // but has not authenticated your app
            that.setState(  {

              login: false 


            })
              console.log('connected but not authorized' + uid)
          } else {
            // the user isn't logged in to Facebook.
            that.setState (  {

                login: false
            }



              )


             console.log('not logged on' + uid)

          }
         });  

    }


  componentDidMount(){ 
    //events 
       console.log("hoaz ")
   FB.Event.subscribe('auth.authResponseChange', this.checkLoginState);



  }

 checkLoginState(event) {
     console.log("made it to event")
     console.log(event)
           
    var current_state = this.state.login;
    if (event.authResponse!=null) {
      // User is signed-in Facebook.

      var that = this;
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

                that.setState( { 

                    login: true
                })

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
                   //browserHistory.push('/singleview');
                  that.setState( { 

                        login: true
                    })
                // User is already signed-in Firebase with the correct user.
              }
            });
    } else {
      // User is signed-out of Facebook.
      console.log("loggin user out");
      firebase.auth().signOut();



        this.setState( { 

            login: false
        })



    }



  }







  componentWillUnMount() {
    //cancel subsription 
       console.log("ir gere ")
    FB.Event.unsubscribe(event, checkLoginState)
      

    //'auth.authResponseChange', checkLoginState

  }




    render() {

        // Animations supported
        //      'rag-fadeIn'
        //      'rag-fadeInUp'
        //      'rag-fadeInDown'
        //      'rag-fadeInRight'
        //      'rag-fadeInLeft'
        //      'rag-fadeInUpBig'
        //      'rag-fadeInDownBig'
        //      'rag-fadeInRightBig'
        //      'rag-fadeInLeftBig'
        //      'rag-zoomBackDown'

        const animationName = 'rag-fadeIn'

var  a =                 <div className="wrapper">
                    <Header />

                    <Sidebar />

                    <Offsidebar />

                    <ReactCSSTransitionGroup
                      component="section"
                      transitionName={animationName}
                      transitionEnterTimeout={500}
                      transitionLeaveTimeout={500}
                    >
                      {React.cloneElement(this.props.children, {
                        key: Math.random()
                      })}
                    </ReactCSSTransitionGroup>

                    <Footer />
                </div>


var b =         <Login/>

var use = <Header/> 

            if (this.state.login) { 

                use = a 
            }

            else  {

                use = b

            }


            return (use)



}


}

export default Base;
