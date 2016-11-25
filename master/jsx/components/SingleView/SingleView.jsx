import React from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import { Grid, Row, Col, Dropdown, MenuItem, Button } from 'react-bootstrap';
import Firebase from 'firebase';
import Spinner from 'react-spinkit';


//connect with Firbase

const firebaseConfig = {
  apiKey: "AIzaSyCBMuCtrDeAD8b7AcZykVGPoYnJrFf3Kjg",
  authDomain: "hansweb-beac1.firebaseapp.com",
  databaseURL: "https://hansweb-beac1.firebaseio.com",
  storageBucket: "hansweb-beac1.appspot.com",
};

const firebase = Firebase.initializeApp(firebaseConfig);



class SingleView extends React.Component {

  constructor() {

    super()
    this.state = {connected: false, pages:{}, select: ""}
    this.names = {hey:"uop"}
    this.listeners = []
    this.generateKey = this.generateKey.bind(this);
    this.getSelected = this.getSelected.bind(this);
    this.disconnect = this.disconnect.bind(this);

}


  componentWillUnMount()   {

    //remove litener

    if (this.listeners.length > 0) {
        this.listeners.forEach(function(ref) {
          ref.off();
        });
    }


  }
  componentWillMount() {

    const firebase_user = firebase.auth().currentUser;
    const userRef = firebase.database().ref('users/' + firebase_user.providerData[0].uid);
    const that = this

    userRef.once('value').then(function(snapshot) {

  //      that.listeners.push(userRef)

        console.log("about to be in this shit sat")
        console.log(snapshot.val())

        if (snapshot.val() != null) {
              console.log(" here we are ")
              that.names = snapshot.val().page_name_to_id

              console.log(that.names)
              console.log(snapshot.val().bot_connected)
              console.log(snapshot.val().pages)

              that.setState = ( {

                  // connected: snapshot.val().bot_connected,
                  // pages: snapshot.val().pages
                  connected: false,
                  pages: {Abstract: "hello", Beer: "tt"}


              },     function () {
      console.log("this state was elegtledy set ")

    })
              console.log(that)
              console.log(that.state)

        }
      })
    }





  getSelected(eventKey, a) {

    var that = this.state;

    this.setState( {
      connected:that.connected,
      pages:that.pages,
      select:a

    });

  }

  disconnect() {
    //delete request to fb
    //bot connected == false
    //udpate state?


    //make sure still logged in


    const that = this;
    const user_id = firebase.auth().currentUser.providerData[0].uid;

    var userRef = firebase.database().ref('users/' +   user_id);

    userRef.once('value').then(function(snapshot) {

              if (snapshot.val() != null) {

                  const page_one = snapshot.val().pages;
                  const messenger_token = snapshot.val().messenger_token
                  const h = that;
                  const url_delete = "https://graph.facebook.com/v2.7/me/subscribed_apps?access_token="+ messenger_token

                  const postData = false ;
                  const postData_two = "";
                  const postData_three = "";

                  var updates = {};


                  updates['/users/' + user_id + '/bot_connected']= postData;
                  updates['/users/' + user_id + '/messenger_token']= postData_two;

                  updates['/users/' + user_id + '/bot_connected_name']= postData_three;


                  firebase.database().ref().update(updates);

                  // url (required), options (optional)
                  fetch(url_delete, {
                  	method: 'DELETE'
                  }).then(function(response) {
                  	 console.log('status: ', response.status);
                     if (response.ok) {

                       console.log('delete went through')

                       h.setState( {
                         connected:false,
                         pages:page_one,
                         select:""
                      });

                     } else {

                       console.log('delete failed')

                     }


                  }).catch(function(err) {
                   console.log('There has been a problem with your fetch operation: ' + err.message);
                  });

                  //
                  // $.ajax({
                  //                         url: url_delete,
                  //                         type: 'DELETE',
                  //                         success: function(result) {
                  //
                  //                           console.log("shit was deleted")
                  //
                  //                                                     h.setState( {
                  //                                                       connected:false,
                  //                                                       pages:page_one,
                  //                                                       select:""
                  //
                  //
                  //                                               });
                  //                             // Do something with the result
                  //                         }
                  //       });

                }


              });




    }

  generateKey() {

    console.log("in key bitch ");

    console.log(this.state.pages[this.state.select]);
    console.log(this.state.pages[this.state.select]);
    //make a get request
    // var xhttp = new window.XMLHttpRequest();
    // xhttp.open("POST", "https://graph.facebook.com/v2.7/me/subscribed_apps?access_token="+this.state.pages[this.state.select], true);
    // xhttp.send();

    // url (required), options (optional)
    const url_post = "https://graph.facebook.com/v2.7/me/subscribed_apps?access_token="+this.state.pages[this.state.select]
    fetch(url_post, {
      method: 'POST'
    }).then(function(response) {
       console.log('status: ', response.status);
       if (response.ok) {

         console.log('post went through')

       } else {

         console.log('post failed')

       }


    }).catch(function(err) {
     console.log('There has been a problem with your fetch operation: ' + err.message);
    });



    var user_id = firebase.auth().currentUser.providerData[0].uid;
    console.log(user_id)
    //firebase
    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    var postData = true;
    var postData_two = this.state.pages[this.state.select];
    // var postData_three = {
    //
    //   bot_connected: true,
    //   messenger_token: this.state.pages[this.state.select]
    //
    // }
  //  console.log
    console.log("ASREREW awer")
    console.log(this.names[this.state.select])

    var token_and_page_id = {
        a : this.state.pages[this.state.select],
        b : this.names[this.state.select]

    }
      var postData_four = this.state.select;

      //second
      var use_this_name = 'unknown'

      try {

        names_keys = Object.keys(this.names)
      }

      catch(e) {
        console.log('error getting keys')

      }

      names_keys.forEach(function(name) {

          if (this.names[this.state.select] === this.names[name]) {

            use_this_name = name
          }
      })

      var key = this.state.pages[this.state.select];

      var postData_new_bot = {page_id:this.names[this.state.select], page_name:use_this_name};

      //add bots to both places

      updates['/users/' + user_id + '/' + this.state.pages[this.state.select]]  = postData_new_bot
      updates['/bot/' + this.state.pages[this.state.select]] = postData_new_bot;
      firebase.database().ref().update(updates);

      var updates_two = {}
      updates_two['/FBmess/hans_venue/page_array'] = token_and_page_id;
      firebase.database().ref().update(updates_two);

      var updates_three = {}
      updates_three['/users/' + user_id + '/bot_connected']= postData;
      firebase.database().ref().update(updates_three);


      // postData_new_bot['messenger_token'] =  this.state.pages[this.state.select]
      //

      var updates_four = {}
      updates_four['/users/' + user_id + '/messenger_token']= postData_two;
      firebase.database().ref().update(updates_four);

      var updates_five = {}
      updates_five['/users/' + user_id + '/bot_connected_name']= postData_four;
      firebase.database().ref().update(updates_five);


      var updates_six = {}
      updates_six['/users/' + user_id + '/bot_connected']= true;
      firebase.database().ref().update(updates_six);


      }




    render() {
        console.log("about to log singleview state")
        console.log(this.state)
        console.log(this.state.connected)
        // const mainMenu = this.state.pages.map((page) => <MenuItem eventKey={i} data-set-lang="en">page</MenuItem>);

        var index = 0;
        var func_click = this.generateKey;
        var func_select = this.getSelected;
        var counter = 0;
        var that = this;
        console.log(Object.keys(this.state.pages));
        var key_page = Object.keys(this.state.pages)
        var func_disc = this.disconnect;

        if (!this.state.connected) {

          //have to make sure that all data has beee processed

          if (key_page === null) {

                      return (
                              <ContentWrapper>

                                  <Row>
                                    <p>Loading your bot information </p>
                                    <Spinner spinnerName='double-bounce' />

                                  </Row>
                              </ContentWrapper>
                            )

          }



          return (
            <ContentWrapper>

                <Row>

                        <Dropdown id = {"base"}>
                            <Dropdown.Toggle>
                            Select a page

                            </Dropdown.Toggle>
                            <Dropdown.Menu className="animated fadeInUpShort">

                              {



                              key_page.map(function(key, i) {

                                return (<MenuItem key={Math.random()} eventKey={key} data-set-lang="en" onSelect={func_select}>{key}</MenuItem>);


                              })








                              }

                            </Dropdown.Menu>

                          </Dropdown>

    <Button bsStyle="primary" bsSize="large" onClick={func_click}>Connect</Button>


                </Row>
            </ContentWrapper>
        )
      }

        return (
            <ContentWrapper>
            <p>You have a bot connected </p>



                <Button bsStyle="primary" bsSize="large" onClick={func_disc}>Disconnect</Button>
                  </ContentWrapper>
        );
    }
}



export default SingleView;
