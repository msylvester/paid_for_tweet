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

//     constructor() {
//         super();
// //        alert("hello");
//          // Get Firebase Database reference.

//       // var firepadRef = firebase.database().ref();

// // firebase.database().ref('users/').set({
// //     username: "sdf",
// //     email: "EEEE",
// //     profile_picture : "CSSS"
// //   });

// var user = firebase.auth().currentUser;

// if (user != null) {
//     alert("I am in single view testing shit")
//   user.providerData.forEach(function (profile) {
//     alert("Sign-in provider: "+profile.providerId);
//     alert("  Provider-specific UID: "+profile.uid);
//     alert("  Name: "+profile.displayName);
//     alert("  Email: "+profile.email);
//     alert("  Photo URL: "+profile.photoURL);
//   });
// }

// alert("i am out of single view ")
//     }

  constructor() {
    super();
            var user = firebase.auth().currentUser;
            var user_name = "";
        alert("I am i cn0st e")
        if (user != null) {
            alert("I am in single view testing shit")
          user.providerData.forEach(function (profile) {
            alert("Sign-in provider: "+profile.providerId);
            alert("  Provider-specific UID: "+profile.uid);
            alert("  Name: "+profile.displayName);
            user_name = profile.displayName;
            alert("  Email: "+profile.email);
            alert("  Photo URL: "+profile.photoURL);
          });
          this.state = {

            user:user_name
          };
           //this.setState({user: user_name});
           alert(this.state.user);
        }
        else { 
           //
           this.state = {

            user:""
           };
           alert(this.state.user)
        }
    
  }

    render() {
        alert("bout to render")

        if (this.state.user!="") {
                    return (
            <ContentWrapper>

                <Row>
                    <Col xs={12} className="text-center">
                        <h2 className="text-thin">     {this.state.user} you currently have a bot subscribed </h2>
                        <p>
                       
                        </p>
                    </Col>
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
                            This project is an application skeleton. You can use it to quickly bootstrap your ReactJS webapp projects and dev environment for these projects.
                            <br/>
                            The seed app doesn't do much and has most of the feature removed so you can add theme as per your needs just following the demo app examples.
                        </p>
                    </Col>
                </Row>
            </ContentWrapper>
        );
    }
}

export default SingleView;
