import React from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import { Grid, Row, Col, Dropdown, MenuItem, Button } from 'react-bootstrap';
import Firebase from 'firebase';





const firebaseConfig = {
  apiKey: "AIzaSyCBMuCtrDeAD8b7AcZykVGPoYnJrFf3Kjg",
  authDomain: "hansweb-beac1.firebaseapp.com",
  databaseURL: "https://hansweb-beac1.firebaseio.com",
  storageBucket: "hansweb-beac1.appspot.com",
};
const firebase = Firebase.initializeApp(firebaseConfig);



class SingleView extends React.Component {

  constructor() {

    super();
    this.state = {connected: '', pages:{}, select: ""}
    console.log("hey in constructor")
    this.generateKey = this.generateKey.bind(this);
    this.getSelected = this.getSelected.bind(this);
    this.disconnect = this.disconnect.bind(this);
    //this.selector = ""; 
}


  componentWillMount() { 
      console.log("compponent s")

      var user = firebase.auth().currentUser;
      console.log(user)

      if (user != null) {
        console.log("bout to get freqkay")
            var that = this;
            var starCountRef = firebase.database().ref('users/' +   user.providerData[0].uid);
            starCountRef.once('value').then(function(snapshot) {
                         console.log(snapshot.val());
                  console.log(snapshot.val().bot_connected);
                   console.log(snapshot.val().pages);
                that.setState ( {  
                  connected:snapshot.val().bot_connected,
                  pages:snapshot.val().pages,
                  select:""

                
                })
         
            });
            console.log("about to log pages");
                console.log(that.state.pages);




    }
    
  }

  getSelected(eventKey, a) { 
    console.log("what");
    console.log(a);
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
    var that = this; 

 var user_id = firebase.auth().currentUser.providerData[0].uid;
            var starCountRef = firebase.database().ref('users/' +   user_id);
            starCountRef.once('value').then(function(snapshot) {
                         console.log(snapshot.val());
                          messenger_token = snapshot.val().messenger_token
                           var xhttp = new window.XMLHttpRequest();
                          xhttp.open("DELETE", "https://graph.facebook.com/v2.7/me/subscribed_apps?access_token="+this.state.pages[this.state.select], true);
                          xhttp.send();
                          this.setState( {
                                  connected:false,
                                  pages:that.pages,
                                  select:""


                          });
         
            });

   
    console.log(user_id)
        //firebase 
         // Write the new post's data simultaneously in the posts list and the user's post list.
      var updates = {};
      var postData = {

          bot_connected: false,
          messenger_token: ""
      }
      
      updates['/users/' + user_id] = postData;
      firebase.database().ref().update(updates);



      var updates = {};
      var postData = {

          bot_connected: false,
          messenger_token: ""

      }
      updates['/bot/messenger_token'] = postData;
       firebase.database().ref().update(updates);



  }
  //https://hansweb-beac1.firebaseio.com/users/user_id/

  //  'https://docs-examples.firebaseio.com/rest/saving-data/users/alanisawesome.json 

  generateKey() { 

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
  var postData = {

      bot_connected: true,
      messenger_token: this.state.pages[this.state.select]

  }

      xhttp.open("PATCH", "https://hansweb-beac1.firebaseio.com/users/"+ user_id, true);
      xhttp.send(postData);




 //  updates['/users/' + user_id] = postData;
 //  firebase.database().ref().update(updates);
  var updates = {};
  var postData = {

      bot_connected: true,
      messenger_token: this.state.pages[this.state.select]

  }
  updates['/bot/messenger_token'] = postData;

 var that = this; 

  firebase.database().ref().update(updates);

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
        //get bot anme that is connected 
        //var connected_bot = firebae.database().ref('\users' + user.providerData[0].uid/bot_connected)
        //if bot is no
        if (!this.state.connected) {
                    return (
            <ContentWrapper>

                <Row>
               
                        <Dropdown>
                            <Dropdown.Toggle>
                                {key_page[0]}
                    
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="animated fadeInUpShort">

                              {  
                           
                              key_page.map(function(key, i) {

                                return (<MenuItem key={key.id} eventKey={key} data-set-lang="en" onSelect={func_select}>{key}</MenuItem>)


                              })

                              }
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
            <p>You have a bot connected to fb page</p>
                <Button bsStyle="primary" bsSize="large" onClick={func_disc}>Disconnect</Button>
                  </ContentWrapper>
        );
    }
}

export default SingleView;
