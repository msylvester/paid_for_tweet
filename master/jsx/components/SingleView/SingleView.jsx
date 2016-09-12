import React from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import { Grid, Row, Col, Dropdown, MenuItem } from 'react-bootstrap';
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
    this.state = {connected: '', pages:[]}
    console.log("hey in constructor")
}


componentWillMount() { 
    console.log("compponent s")

    var user = firebase.auth().currentUser;
    console.log(user)

    if (user != null) {
    
          var starCountRef = firebase.database().ref('users/' +   user.providerData[0].uid);
          starCountRef.on('value', function(snapshot) {
                       console.log(snapshot.val());
                console.log(snapshot.val().bot_connected);
                 console.log(snapshot.val().pages);
              this.setState ( {  
                connected:snapshot.val().bot_connected,
                pages:snapshot.val().pages
              
              })
          });




}
  
}


    render() {
        console.log(this.state)

        if (this.state.connected==="false") {
                    return (
            <ContentWrapper>

                <Row>
                  <div className="pull-right">
                        <Dropdown id="dropdown-tr" pullRight>
                            <Dropdown.Toggle>
                                {this.state.pages[0]}
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="animated fadeInUpShort">
                                <MenuItem eventKey="1" data-set-lang="en">{this.state.pages[0]}</MenuItem>
                                <MenuItem eventKey="2" data-set-lang="es">{this.state.pages[1]}</MenuItem>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </Row>
            </ContentWrapper>
        )
      }
        
        return (
            <ContentWrapper>

                <Row>
                    <Col xs={12} className="text-center">
                        <h2 className="text-thin">This is where we see the bots </h2>
                        <p>
                            It is connected 
                        </p>
                    </Col>
                </Row>
            </ContentWrapper>
        );
    }
}

export default SingleView;
