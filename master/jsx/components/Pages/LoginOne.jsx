import React from 'react';
import { Grid, Row, Col, Panel, Button } from 'react-bootstrap';
import {Link} from 'react-router';
import Login from '../Login/Login'
import Firebase from 'firebase';
import Spinner from 'react-spinkit';
import NotFound from './NotFound';
class LoginOne extends React.Component {


    constructor(props) {
      super(props)

      this.checkLoginState = this.checkLoginState.bind(this);


      if (this.props.location.state != null)   {
        console.log(this.props.location.state.user.logged_out)

        this.state = {
          loading: '',
          login: '',
          registered: '',
          email: '',
          users: {}

        }

      }
      else {

      this.state = {
        loading: '',
        login: '',
        registered: '',
        email: '',
        users: {}

      }
    }

    }

componentDidMount() {
  FB.Event.subscribe('auth.authResponseChange', this.checkLoginState);
          var that  = this
          FB.getLoginStatus((response) => {
            if (response.status === 'connected') {
              // the user is logged in and has authenticated your
              // app, and response.authResponse supplies
              // the user's ID, a valid access token, a signed
              // request, and the time the access token
              // and signed request each expire
              var uid = response.authResponse.userID;
              var accessToken = response.authResponse.accessToken;
              const a = this
              var localEmail = ""

              FB.api('/' + uid, {fields: 'email'}, (response1) => {
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
                          console.log("T in teh key sarray ")
                            console.log(snapshot.val()[bot]['user'])
                            //console.log(snapshot.val().bot.user)
                            auth_users.push(snapshot.val()[bot]['user'])

                        })

                      if (auth_users.find(x => x === response1.email) != undefined) {
                          console.log("tasdfdf")

                            over_state.setState( {
                              email: response1.email,
                              registered:true
                            })

                      }
                      else {
                          console.log("fucs ff")
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

    componentWillMount() {
        this.setState({
              loading: true

        })

    }



    componentWillUnmount() {
      console.log("ir gere ")
      FB.Event.unsubscribe(event, this.checkLoginState)


    }

    checkLoginState(event) {
        console.log("made it to event")
        console.log(event)
        console.log(this)
        var that = this
        console.log('the')
        console.log(that)
       var current_state = this.state.login;
       if (event.authResponse!=null) {
         // User is signed-in Facebook.


         var unsubscribe = firebase.auth().onAuthStateChanged( (firebaseUser) => {
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


                   var lcla = that

                       FB.api('/me/accounts', (response) => {

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

                         const over_state = lcla
                         var user_email = ""

                         if (over_state.state.email != null) {

                             user_email = over_state.state.email


                         }

                         var temp = {                   email: user_email,
                                            uid:event.authResponse.userID,
                                            bot_connected:false,
                                            credential:event.authResponse.accessToken,
                                            pages:  page_names,
                                            page_name_to_id: page_names_to_id,
                                            messenger_token: "",
                                            struct_message:  {
                                                   first:  {
                                                       date_made:"a",
                                                       date_sent:"",
                                                       segment: ""

                                                   }
                                           },
                                           segments:  {
                                               first:  {
                                                 gender: 'B',
                                                 location:'ALL',
                                                 age:'ALL'

                                               }
                                             } }


                          try {
                              var userRef = firebase.database().ref('users/' + event.authResponse.userID);
                              ///check if new users
                              try {
                            //  var wtf = this.isInDb(event.authResponse.userID, firebase.database().ref('users'), temp)




                                                    console.log("Therer aewr er ")
                                                  try {
                                                    var lclID = event.authResponse.userID
                                                  }
                                                  catch (eroor) {

                                                    console.log("Sfsaf aere r")

                                                  }

                                                  try {
                                                    var lclInput = firebase.database().ref('users')
                                                  }
                                                  catch (error) {
                                                    console.log("tere")
                                                  }

                                                  try {
                                                          var dddd = temp
                                                  }
                                                  catch (error) {
                                                  console.log("terasefe e")
                                                  }



                                                    console.log("WERER @#E")

                                                    lclInput.once('value').then((snapshot) => {
                                                    //updateStarCount(postElement, snapshot.val());
                                                      var keys = Object.keys(snapshot.val())
                                                      var inDB = false

                                                      keys.forEach((key) => {
                                                          if (key === lclID) {
                                                            inDB = true
                                                          }

                                                      })

                                                      if (inDB) {
                                                        //update
                                                        const postData_three = "";

                                                        var updates = {};
                                                    console.log("WERER @#E eererr")
                                                      console.log(snapshot.val())
                                                      console.log(snapshot.val()[lclID])
                                                        updates['/users/' + user_id + '/pages/']=  snapshot.val()[lclID]['pages'];
                                                        updates['/users/' + user_id + '/page_name_to_id/']=  snahpshot.val()[lclID]['page_name_to_id'];


                                                        firebase.database().ref().update(updates).then((finish) => {

                                                              this.setState( {
                                                                login: true,
                                                                users: lclInput
                                                              })

                                                        } );
                                                      }
                                                      else  {
                                                        //set

                                                        console.log("WERER @#E erAER")
                                                        firebase.database().ref('users/' + event.authResponse.userID).set({
                                                            email: lclInput.email,
                                                            uid:lclInput.uid,
                                                            bot_connected:false,
                                                            credential:lclInput.credential,
                                                            pages:  lclInput.pages,
                                                            page_name_to_id: lclInput.page_name_to_id,
                                                            messenger_token: lclInput.messenger_token,
                                                            struct_message:  {
                                                                   first:  {
                                                                       date_made:"",
                                                                       date_sent:""

                                                                   }
                                                           },
                                                           segments:  {
                                                               first:  {
                                                                 gender: 'B',
                                                                 location:'ALL',
                                                                 age:'ALL'

                                                               }
                                                             }
                                                           }).then((finish) => {
                                                           dddd.setState (  {

                                                             login: true,
                                                             users: lclInput
                                                           })

                                                          })





                                                      }

                                                    })





























                              }
                              catch(error) {
                                console.log("the erro was here")

                              }
                          }
                          catch(error) {
                            console.log("There was an eror tryin to set user ref")

                          }


                      //  over_state.setState ( {
                       //
                      //    users:temp
                      //  })



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

                  //  that.setState( {
                   //
                  //      login: true
                   //
                  //  })

                 } else {
                   console.log("gere i a me in the this shit");
                   console.log("")

                   var aa = that
                   FB.api('/me/accounts', (response) => {

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

                     const over_state = aa
                     var user_email = ""

                     if (over_state.state.email != null) {

                         user_email = over_state.state.email


                     }

                     var temp = {       email: user_email,
                                        uid:event.authResponse.userID,
                                        bot_connected:false,
                                        credential:event.authResponse.accessToken,
                                        pages:  page_names,
                                        page_name_to_id: page_names_to_id,
                                        messenger_token: "" }


                    var userRef = firebase.database().ref('users/' + event.authResponse.userID);



                    console.log("hello  i hit this ")
                  //  console.log(firebase_user.providerData[0].uid)

                      try {
                          var userRef = firebase.database().ref('users/' + event.authResponse.userID);
                        ///check if new users
                        try {
                      //  var sdf = this.isInDb(event.authResponse.userID, firebase.database().ref('users'), temp)




                      console.log("Therer aewr er ")
                      console.log("Therer aewr er ")
                    try {
                      var lclID = event.authResponse.userID
                    }
                    catch (error) {

                      console.log("Sfsaf aere r")

                    }

                    try {
                      var lclInput = firebase.database().ref('users')
                    }
                    catch (error) {
                      console.log("tere")
                    }

                    try {
                            var dddd = temp
                    }
                    catch (error) {
                    console.log("terasefe e")
                    }
                      console.log("WERER @#E")

                      const local_this = this
                      const local_pages = page_names
                      const local_page_names = page_names_to_id
                      const local_ID = lclID

                      lclInput.once('value').then((snapshot) => {
                      //updateStarCount(postElement, snapshot.val());
                        var keys = Object.keys(snapshot.val())
                        var inDB = false

                        keys.forEach((key) => {
                            if (key === local_ID) {
                              inDB = true
                            }

                        })

                        if (inDB) {
                          //update pdnt know if this is the shit
                          //  const postData_three = "";

                            var updates = {};
                            console.log("WERER @#E eererr")
                            console.log(local_ID)
                            console.log(snapshot.val()[local_ID])

                            try  {
                            //  updates['/users/' + lclID + '/pages/'] = snapshot.val()[lclID]['pages'];
                                updates['/users/' + lclID + '/pages/'] = local_pages
                            }
                            catch (error)  {
                              if (error.message) {
                                  console.log("there was an error trying to catch this shit ser t4er" + error.message)
                                }
                              }

                            try   {

                              //  updates['/users/' + lclID + '/page_name_to_id/'] =  snapshot.val()[lclID]['page_name_to_id'];

                                updates['/users/' + lclID + '/page_name_to_id/'] =  local_page_names

                            }
                            catch(error) {
                            console.log("actually they erorry s qwed  ")
                            }
                            try {
                            firebase.database().ref().update(updates)
                            }
                            catch (error){
                              console.log("this is ane roror ")
                            }


                            //make users object

                            try {
                                  var lcl_temp = {   email: snapshot.val()[local_ID]['email'],
                                                     uid: snapshot.val()[local_ID]['uid'],
                                                     bot_connected: snapshot.val()[local_ID]['bot_connected'],
                                                     credential: snapshot.val()[local_ID]['credential'],
                                                     pages:  local_pages,
                                                     page_name_to_id: local_page_names,
                                                     messenger_token: snapshot.val()[local_ID]['messenger_token']
                                                   }
                                                 }
                           catch(error) {
                             console.log("error settinmg local temp")
                           }


                          try {
                            this.setState( {
                            login: true,
                            users:lcl_temp
                            })
                          }
                          catch (error) {
                            console.log(error.message)
                            console.log(this.state)
                            console.log("Tno sgi is actually ehre *()")

                          }

                        }
                        else  {
                          //set

                          console.log("WERER @#E erAER")
                          firebase.database().ref('users/' + event.authResponse.userID).set({
                              email: lclInput.email,
                              uid:lclInput.uid,
                              bot_connected:false,
                              credential:lclInput.credential,
                              pages:  lclInput.pages,
                              page_name_to_id: lclInput.page_name_to_id,
                              messenger_token: lclInput.messenger_token,
                              struct_message:  {
                                     first:  {
                                         date_made:"",
                                         date_sent:""

                                     }
                             },
                             segments:  {
                                 first:  {
                                   gender: 'B',
                                   location:'ALL',
                                   age:'ALL'

                                 }
                               }
                             }).then((finish) => {
                             dddd.setState (  {

                               login: true,
                               users: lclInput
                             })

                            })





                        }

                      })
                      }
                    catch(error) {
                      console.log("there was tehr ewa fe")
                    }

                  }
                  catch(error) {
                    console.log("There was an eror tryin to set user ref")

                  }

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


    //
    //                   var firebase_user = firebase.auth().currentUser;
    //
    //
    //                   var userRef = firebase.database().ref('users/' + firebase_user.providerData[0].uid);
    //
    //                   var that = this
    //
    //                   console.log("hello  i hit this ")
    //                   console.log(firebase_user.providerData[0].uid)
    //                   userRef.on('value', function(snapshot) {
    //                     //updateStarCount(postElement, snapshot.val());
    //                       console.log("about to be in this shit sat")
    //                       console.log(snapshot.val())
    //                       if (snapshot.val() != null) {
    //
    //                             this.setState ( { user: snapshot.val() } )
    //
    //
    //                       }
    //                   });

    componentDidUpdate(prevProps, prevState) {

      if (this.state.login === true && this.state.registered === true) {

        var  a = Object.keys(this.state.users)


          if(a.length > 0) {

                  const path = {
                      pathname: '/home',
                      state: { user: this.state.users }
                    }
          this.context.router.push(path)
        }



      }

      if (this.state.login === true && this.state.registered === false) {

        var  a = Object.keys(this.state.users)


          if(a.length > 0) {

                  const path = {
                      pathname: '/notfound'
                    }
          this.context.router.push(path)
        }



      }

    }

    render() {



      // if (this.state.loading) {
      //
      // }

      // if (this.state.login ===true && this.state.registered === true) {
      //
      //           var  a = Object.keys(this.state.users)
      //
      //
      //             if(a.length > 0) {
      //
      //                     const path = {
      //                         pathname: '/home',
      //                         state: { user: this.state.users }
      //                       }
      //             this.context.router.push(path)
      //           }
      //
      //
      //
      // }

  if (!this.state.loading) {
        return (

//
          <div className="block-center mt-xl wd-xl">
               { /* START panel */ }
               <div className="panel panel-dark panel-flat">
                   <div className="panel-heading text-center">
                       <a href="#">
                           <img src="img/logo.png" alt="Image" className="block-center img-rounded" />
                       </a>
                   </div>
                   <div className="panel-body">
                       <p className="text-center pv">SIGN IN TO CONTINUE.</p>
                       <Login/>

                       <p className="pt-lg text-center">Need to Bot?</p><a href="www.brainitch.com" className="btn btn-block btn-default">Go Get One!</a>

                 </div>
               </div>

               { /* END panel */ }
           </div>


            );
          }

          return(          <div className="block-center mt-xl wd-xl">
                         { /* START panel */ }
                         <div className="panel panel-dark panel-flat">
                             <div className="panel-heading text-center">
                                 <a href="#">
                                     <img src="img/logo.png" alt="Image" className="block-center img-rounded" />
                                 </a>
                             </div>
                             <div className="panel-body">

                                         <Spinner spinnerName='double-bounce' />
                           </div>
                         </div>

                         { /* END panel */ }
                     </div>)

    }

}

LoginOne.contextTypes = {
    router: React.PropTypes.object.isRequired
};



export default LoginOne;
