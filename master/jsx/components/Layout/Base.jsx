import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Header from './Header'
import Sidebar from './Sidebar'
import Offsidebar from './Offsidebar'
import Footer from './Footer'
import Login from '../Login/Login'
import Targeted from '../Targeted/Targeted'

import ContentWrapper from './ContentWrapper';
//import Firebase from 'firebase';





class Base extends React.Component {

    constructor() {
        super();

        this.state = {

            login:false,
            registered:false,
            email:''

        }

        this.page_array_id = []
        console.log("is it here")
        this.checkLoginState = this.checkLoginState.bind(this);
    }





    // //componentDidUpdate(prevProps, prevState) {
    //       if (this.state.login === true && this.state.registered === true) {
    //             //make a call to Firebase and get the user
    //
    //             console.log("made it herer")
    //             var k = Object.keys(this.state.user)
    //
    //
    //
    //                 var firebase_user = firebase.auth().currentUser;
    //
    //
    //                 var userRef = firebase.database().ref('users/' + firebase_user.providerData[0].uid);
    //
    //                 var that = this
    //
    //                 console.log("hello  i hit this ")
    //                 console.log(firebase_user.providerData[0].uid)
    //                 userRef.on('value', function(snapshot) {
    //                   //updateStarCount(postElement, snapshot.val());
    //                     console.log("about to be in this shit sat")
    //                     console.log(snapshot.val())
    //                     if (snapshot.val() != null) {
    //                           that.setState = ( {
    //
    //                               user: snapshot.val()
    //
    //                           })
    //                     }
    //                 });
    //           }
    //
    //
    //
    // }


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
            const a = that
            var localEmail = ""

            FB.api('/' + uid, {fields: 'email'},function(response1) {
              if (response1 && !response1.error) {
                /* handle the result */
                console.log("handling")

                console.log(response1)
                const over_state = a
                var starCountRef = firebase.database().ref('FBmess/');

                starCountRef.once('value').then(function(snapshot) {

                      console.log("*dfdfdf awer3 authoriazedd pringting")
                      console.log(snapshot.val())

                      var keys_array = Object.keys(snapshot.val())
                      var auth_users = []
                      keys_array.forEach(bot => {
                          console.log(snapshot.val()[bot]['user'])
                          //console.log(snapshot.val().bot.user)
                          auth_users.push(snapshot.val()[bot]['user'])

                      })

                    if (auth_users.find(x => x === response1.email) != undefined) {


                          over_state.setState( {
                            email: response1.email,
                            registered:true
                          })

                    }
                    else {

                        over_state.setState( {
                          email: response1.email,
                          registered:false
                        })
                    }
              })


              }
             });

            console.log(response.authResponse)
            console.log('connected' + uid)
            //check firebase



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


                console.log("this shoudl be a hit")

                // Build Firebase credential with the Facebook auth token.
                var credential = firebase.auth.FacebookAuthProvider.credential(event.authResponse.accessToken);




                    FB.api('/me/accounts', function(response) {

                      var pages = [];
                      var page_names = {};
                      var page_names_to_id = {};

                      console.log(response.data)
                      for (var i =0; i<response.data.length; i++) {
                          var a = {
                              page_name:response.data[i].name,
                              page_token:response.data[i].access_token

                          }
                      //    this.page_array_id.push(response.data[i].id)
                          page_names[response.data[i].name] = response.data[i].access_token;
                          page_names_to_id[response.data[i].name] = response.data[i].id;
                          pages.push(a);
                      }


                      var user_email = ""

                      if (over_state.state.email != null) {

                          user_email = over_state.state.email


                      }

                      firebase.database().ref('users/' + event.authResponse.userID).set({
                          email: user_email,
                          uid:event.authResponse.userID,
                          bot_connected:false,
                          credential:event.authResponse.accessToken,
                          pages:  page_names,
                          page_name_to_id: page_names_to_id,
                          messenger_token: ""


                    })




                    })



                // Sign in with the credential from the Facebook user.
                firebase.auth().signInWithCredential(credential).catch(function(error) {
                  // Handle Errors here.
                  var errorCode = error.code;
                  console.log("There was an error creating a credenial")
                  console.log(errorCode)
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
                console.log("")

                that.setState( {

                    login: true
                })

                  }



    })

  }


  else {
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
        const items = [
             'rag-fadeIn',
             'rag-fadeInUp',
             'rag-fadeInDown',
             'rag-fadeInRight',
             'rag-fadeInLeft',
             'rag-fadeInUpBig',
             'rag-fadeInDownBig',
             'rag-fadeInRightBig',
             'rag-fadeInLeftBig',
             'rag-zoomBackDown'
           ]

      //  const animationName = 'rag-fadeIn'
        var animationName = items[Math.floor(Math.random()*items.length)];

        var render_email = ''

        var email_matches = false
        //get the current user email
        var user = firebase.auth().currentUser;
        console.log(user)

      //  var getAuthorizedList = firebase.database().ref('Authorized/')


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
                        key: Math.random(),
                        beer: 'g'
                      })}
                    </ReactCSSTransitionGroup>

                    <Footer />
                </div>


var b =         <Login/>


var c =  <ContentWrapper>
        <p>

        You do not have a bot registered with Brainitch. Please email msylvest55@gmail.com to solve.
        </p>

        </ContentWrapper>

var use =   <Header/>


//three cases, either they have a bot and are login
//or they login but they are not authroized
//for authorizd code it is, get authorized list, then compare to current user email
            console.log(this.state.login)
            console.log(this.state.registered)
            if (this.state.login && this.state.registered) {

                use = a
            }

            else if (this.state.login && !this.state.registered) {

              use = c

            }

            else  {

              const path = `/login`
              this.context.router.push(path)
                //browserHistory.push(path)

            }


            return (use)



          }


}

Base.contextTypes = {
    router: React.PropTypes.func.isRequired
};

export default Base;
