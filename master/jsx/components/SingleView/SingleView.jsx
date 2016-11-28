import React from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import { Grid, Row, Col, Dropdown, MenuItem, Button } from 'react-bootstrap';
import Firebase from 'firebase';
import Spinner from 'react-spinkit';
import NotFound from '../Pages/NotFound'

//connect with Firbase

const firebaseConfig = {
  apiKey: "AIzaSyCBMuCtrDeAD8b7AcZykVGPoYnJrFf3Kjg",
  authDomain: "hansweb-beac1.firebaseapp.com",
  databaseURL: "https://hansweb-beac1.firebaseio.com",
  storageBucket: "hansweb-beac1.appspot.com",
};

const firebase = Firebase.initializeApp(firebaseConfig);


class SingleView extends React.Component {



  constructor(props) {

    super(props)
    console.log(this)

    this.state = {connected: this.props.user.bot_connected, pages:this.props.user.pages, select: ""}
    console.log("SFDFF")
    //console.log(this.props.location.state.user.page_name_to_id)
    this.names = this.props.user.page_name_to_id
    //this.listeners = []
    this.generateKey = this.generateKey.bind(this);
    this.getSelected = this.getSelected.bind(this);
    this.disconnect = this.disconnect.bind(this);

}



  getSelected(eventKey, a) {

    var that = this.state;

    this.setState( {

      select:a

    });

  }

  disconnect() {

    const user_id = firebase.auth().currentUser.providerData[0].uid;
    const url_delete = "https://graph.facebook.com/v2.7/me/subscribed_apps?access_token="+ this.props.user.messenger_token


    fetch(url_delete, {
    	method: 'DELETE'
    }).then((response) => {
    	 console.log('status: ', response.status);
       if (response.ok) {

         console.log('delete went through')


         const postData = false ;
         const postData_two = "";
         const postData_three = "";

         var updates = {};

         updates['/users/' + user_id + '/bot_connected']= postData;
         updates['/users/' + user_id + '/messenger_token']= postData_two;

         updates['/users/' + user_id + '/bot_connected_name']= postData_three;


         firebase.database().ref().update(updates);

         this.setState(  {

              connected:false,
              pages:this.props.user.pages,
              select:""

         })



       } else {

         console.log('delete failed')

       }


    }).catch(function(err) {
     console.log('There has been a problem with your fetch operation: ' + err.message);
    });




    // userRef.once('value').then((snapshot)=> {
    //
    //           if (snapshot.val() != null) {
    //
    //               const page_one = snapshot.val().pages;
    //               const messenger_token = snapshot.val().messenger_token
    //               const h = that;
    //               const url_delete = "https://graph.facebook.com/v2.7/me/subscribed_apps?access_token="+ messenger_token
    //
    //               const postData = false ;
    //               const postData_two = "";
    //               const postData_three = "";
    //
    //               var updates = {};
    //
    //
    //               updates['/users/' + user_id + '/bot_connected']= postData;
    //               updates['/users/' + user_id + '/messenger_token']= postData_two;
    //
    //               updates['/users/' + user_id + '/bot_connected_name']= postData_three;
    //
    //
    //               firebase.database().ref().update(updates);
    //
    //               // url (required), options (optional)
    //               fetch(url_delete, {
    //               	method: 'DELETE'
    //               }).then((response) => {
    //               	 console.log('status: ', response.status);
    //                  if (response.ok) {
    //
    //                    console.log('delete went through')
    //
    //                    h.setState( {
    //                      connected:false,
    //                      pages:page_one,
    //                      select:""
    //                   });
    //
    //                  } else {
    //
    //                    console.log('delete failed')
    //
    //                  }
    //
    //
    //               }).catch(function(err) {
    //                console.log('There has been a problem with your fetch operation: ' + err.message);
    //               });
    //
    //
    //             }
    //
    //
    //           });




    }

  generateKey() {

    //make a get request
    // var xhttp = new window.XMLHttpRequest();
    // xhttp.open("POST", "https://graph.facebook.com/v2.8/me/subscribed_apps?access_token="+this.state.pages[this.state.select], true);
    // xhttp.send();


    const url_post = "https://graph.facebook.com/v2.8/me/subscribed_apps?access_token="+this.state.pages[this.state.select]

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

    var updates = {};
    var postData = true;
    var postData_two = this.state.pages[this.state.select];

    console.log("ASREREW awer")
    console.log(this.names[this.state.select])

    var token_and_page_id = {
        a : this.state.pages[this.state.select],
        b : this.names[this.state.select]

    }

    var postData_four = this.state.select;

    //second
    var use_this_name = 'unknown'
    var names_keys =[]
    try {

       names_keys = Object.keys(this.names)
    }

    catch(e) {
      console.log('error getting keys')

    }

    names_keys.forEach(function(name) {
      console.log(name)

        // if (this.names[this.state.select] === this.names[name]) {
        //
        //   use_this_name = name
        // }
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

    console.log("here")
    this.setState = (   {

        connected: true

    })
    console.log("set state")

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
