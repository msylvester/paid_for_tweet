import React from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import { Grid, Row, Col, Dropdown, MenuItem, Button } from 'react-bootstrap';
import Firebase from 'firebase';
import Spinner from 'react-spinkit';




const firebaseConfig = {
  apiKey: "AIzaSyCBMuCtrDeAD8b7AcZykVGPoYnJrFf3Kjg",
  authDomain: "hansweb-beac1.firebaseapp.com",
  databaseURL: "https://hansweb-beac1.firebaseio.com",
  storageBucket: "hansweb-beac1.appspot.com",
};
const firebase = Firebase.initializeApp(firebaseConfig);



class SingleView extends React.Component {

  constructor(props) {

    super(props);
    console.log("in the constructor for single")
    console.log(this.props)
    this.state = {connected: '', pages:{}, select: ""}
    this.names = {hey:"uop"}
    this.generateKey = this.generateKey.bind(this);
    this.getSelected = this.getSelected.bind(this);
    this.disconnect = this.disconnect.bind(this);
    //this.selector = "";
}


  componentWillMount() {


      var user = firebase.auth().currentUser;
      console.log(user)
      const that = this
      if (user != null) {


            var starCountRef = firebase.database().ref('users/' +   user.providerData[0].uid);
            starCountRef.once('value').then(function(snapshot) {
                            console.log(snapshot.val());
                            console.log(snapshot.val().bot_connected);
                            console.log(snapshot.val().pages);
                            console.log("*(* about to )")
                            console.log(snapshot.val().page_name_to_id);

                            that.setState ( {
                            connected:snapshot.val().bot_connected,
                            pages:snapshot.val().pages,
                            select:""
                            })
                            console.log(that.names)
                            that.names = snapshot.val().page_name_to_id
                            console.log(that.names)

            });


    }

  }

  getSelected(eventKey, a) {


    //make sure still logged in




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





    var that = this;

 var user_id = firebase.auth().currentUser.providerData[0].uid;
            var starCountRef = firebase.database().ref('users/' +   user_id);
            starCountRef.once('value').then(function(snapshot) {
                         console.log(snapshot.val());
                         var page_one=  snapshot.val().pages;
                          var messenger_token = snapshot.val().messenger_token
                          var h = that;
                          var url_delete = "https://graph.facebook.com/v2.7/me/subscribed_apps?access_token="+ messenger_token


                          var updates = {};
                          var postData =false ;
                          var postData_two = "";
                          var postData_three = "";



                          updates['/users/' + user_id + '/bot_connected']= postData;
                          updates['/users/' + user_id + '/messenger_token']= postData_two;

                          updates['/users/' + user_id + '/bot_connected_name']= postData_three;


                          firebase.database().ref().update(updates);




                           $.ajax({
                                                  url: url_delete,
                                                  type: 'DELETE',
                                                  success: function(result) {

                                                    console.log("shit was deleted")

                                                                              h.setState( {
                                                                                connected:false,
                                                                                pages:page_one,
                                                                                select:""


                                                                        });
                                                      // Do something with the result
                                                  }
                                });




            });






  }
  //https://hansweb-beac1.firebaseio.com/users/user_id/

  //  'https://docs-examples.firebaseio.com/rest/saving-data/users/alanisawesome.json

  generateKey() {


    // const appPageRef = firebase.database().ref('/users/' + user_id);
    // appPageRef.once('value').then(function(snapshot) {
    //
    //       console.log("*dfdfdf awer3 authoriazedd pringting")
    //       console.log(snapshot.val())
    //       var updates = {}
    //       token_and_page_id
    //       () => this.
    //       updates['/FBMess/hans_venue/page_array'] = token_and_page_id;
    //   })


    console.log("in key bitch ");

    console.log(this.state.pages[this.state.select]);
    console.log(this.state.pages[this.state.select]);
    //make a get request
    var xhttp = new window.XMLHttpRequest();
    xhttp.open("POST", "https://graph.facebook.com/v2.7/me/subscribed_apps?access_token="+this.state.pages[this.state.select], true);
    xhttp.send();

    var user_id = firebase.auth().currentUser.providerData[0].uid;
    console.log(user_id)
    //firebase
    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    var postData = true;
    var postData_two = this.state.pages[this.state.select];
    var postData_three = {

      bot_connected: true,
      messenger_token: this.state.pages[this.state.select]

    }
  //  console.log
    console.log("ASREREW awer")
    console.log(this.names[this.state.select])

    var token_and_page_id = {
        a : this.state.pages[this.state.select],
        b : this.names[this.state.select]

    }
      var postData_four = this.state.select;


      updates['/users/' + user_id + '/bot_connected']= postData;
      updates['/users/' + user_id + '/messenger_token']= postData_two;

      updates['/users/' + user_id + '/bot_connected_name']= postData_four;

      updates['/bot/messenger_token'] = postData_three;

      updates['/FBmess/hans_venue/page_array'] = token_and_page_id;

      firebase.database().ref().update(updates);




      var that = this;

      //firebase.database().ref().update(updates);

      this.setState ( {
                        connected:true,
                  pages:that.state.pages,
                  select:""
                });




      }




    render() {
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

          if (!key_page || key_page.length < 1) {



                      return (
              <ContentWrapper>

                  <Row>

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

                                return (<MenuItem key={key.id} eventKey={key} data-set-lang="en" onSelect={func_select}>{key}</MenuItem>);


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
