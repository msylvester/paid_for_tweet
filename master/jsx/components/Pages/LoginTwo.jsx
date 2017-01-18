import React from 'react';
import { Grid, Row, Col, Panel, Button, ProgressBar, FormGroup, FormControl } from 'react-bootstrap';
import {Link} from 'react-router';

import firebase from 'firebase';
import Spinner from 'react-spinkit';
import NotFound from './NotFound';

import credentials from '../firebase_conf_params';

class LoginTwo extends React.Component {

    constructor(props){
        super(props);
        this.makeArrayFromData = this.makeArrayFromData.bind(this)
        this.state = {
          login:"",
          failed_login:"",
          email: "",
          password: ""
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.getValidationState = this.getValidationState.bind(this)
        this.isElementBInA = this.isElementBInA.bind(this)
        }


    getValidationState() {
      //const length = this.state.value.length;
      const length = 11
      if (length > 10) return 'success';
      else if (length > 5) return 'warning';
      else if (length > 0) return 'error';
    }



    handleChangeEmail(event){
      console.log(this.state.email)
      {/* this.setState({email:this.state.email}) */}
      this.setState({email:event.target.value})

    }

    handleChangePassword(event){
      console.log(this.state.password)
      this.setState({password:event.target.value})
    }


//ComponentWillMount - funciton definition in the next two sentences
//check firebase to see if a user if logged in.  In order to do this, there is a firebase method that
//is available to view both in abstract adcmin and also on the firebase docs page


    componentWillMount(){
      const authFirebase = credentials.AUTH
      authFirebase.onAuthStateChanged(function(user) {
        if (user) {
          console.log(user);
          // User is signed in.
          this.setState({login:true,
            failed_login:false
          })

        } else {
          // No user is signed in.
          this.setState({
            failed_login:"",
            login: ""
          })

        }
      });

}




//Logic of web app:
//user views a page, namely, LoginTwo.jsx whihc has two text fields, one for password, one for email
//there are three states ->
//    - user is logged in
//    - user has to log in
//    - user has tried to login but failed


//note 'logging in ' is described as user entering an email and a password and then hitting the submit button

//case:user not logged in and has not attempted to login



//case:  user has logged in:
//in this case, we set state to login:true, failed_login:false
//the code for set state should be in the onSumbit method seee mothod for more info

//case:user logged in
//in component will mount, check to see if this is the case
//follow notes above under defintion of function
//if logged in, change state of component to component.setState({failed_login:true})




    componentDidMount(){
      {/*After component has mounted, we use firebase methods to determine if a user has been logged out during a session*/}

      // Initiates Firebase auth and listen to auth state changes.
      //write now do not attach a firebase listener to any components, we will shorlty, but not at this moment
      //instead, if you need to make a call to firebase, use ('once')


    //  auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));




    }







//onSubmit
//This funciton is called after user hits sumbit button
//the argument (e) is an event, you can use the javscript debugger ot view properties of e by console.log(e)
//in this funciton we want to check to see if the user is in an authorized user
//how you do this is by looking at the code in abstract admin
//

    onSubmit(event){
      credentials.AUTH.signInWithEmailAndPassword(this.state.email, this.state.password).then((result) =>{

        const usersRef = firebase.database().ref('RegisteredUsers/');


        //get logged in users emial

        usersRef.once('value').then((snapshot) => {
            let dict_admin = snapshot.val()['brainitch'];
            let ownsFbAppId = snapshot.val()['ownsFbAppId'];
            let usesHans = snapshot.val()['usesHans'];
            ///get us the current users email from fb abd see whic


            //call that function to get an array of all emails in a given registered user bucket


            //check ot see what type of user

            // function(a, b) {
            //     return a.indexOf(b) != -1
            // }

            //this is ugly af vut im gonan do it anyway



            if(this.isElementBInA(this.makeArrayFromData(dict_admin), this.state.email)) {
                //hey i have a branitich user

                //here we want to route to a realaly easy web app

                

            }


            else if(this.isElementBInA(this.makeArrayFromData(ownsFbAppId), this.state.email)) {

              //user is non admin and has a fb app id
            }

            else if(this.isElementBInA(this.makeArrayFromData(usesHans), this.state.email)) {
              //user is using app for intended purpose
            }


            else {

               //we have some kind of errorr
               //because this case would be user is logged in but is not present among the Registered Users branch in Firebase
            }

        })

        this.setState({
          login:true,
          failed_login:false
//Check to see what type of users they are, we want to locate our users in registered user, Registered user, employee, we want to check where fibase key....values .on (once,""
        })
      }).catch(function(error) {
        // Handle Errors here.

        var errorCode = error.code;
          console.log(errorCode)
        var errorMessage = error.message;
        console.log(errorMessage)
        // ...
      });



  event.preventDefault();

}



  //is element b in a

  isElementBInA(arrayA, b) {
   return arrayA.indexOf(b) != -1

  }

  //makeArrayFromData

  makeArrayFromData(objectObj) {
    //get the keys in an array
    const array_for_object = Object.keys(objectObj)

    //populate with array data
    let arrayA = []

  return  array_for_object.map((object)=>arrayA.push(object))


  }


//look at abstract admin to verify a user is in db
//if is authorized, alert("this is user a  he is logged in")

//if bad password
//then set state to login:false failed_login: true

      //Check and see if this user is registered or this credetials are correct
      //If credentials are false/ don't exist, set this.failedlogin state to true

    render(){
        let title =                             <a href="#">
                     <img src="img/logo.png" alt="Image" className="block-center img-rounded" />
                 </a>
      // return to the panel,the image and empty form

        if (this.state.login==="" && this.state.failed_login === ""){

      return (

                  <div className="block-center mt-xl wd-xl">
                       { /* START panel */ }
                       <Panel style={{'height':'50%',  'width':'50%'}} header={title}>




                               <p className="text-left pv">SIGN IN TO CONTINUE.</p>


                                {/*<form className="mb-lg" onSubmit={this.handleSubmit}>
                                         <label>
                                           Email:
                                           <input type="text" value={this.state.value} onChange={this.handleChange} />
                                         </label>


                                         <label>
                                           Pass:
                                           <input type="text" value={this.state.value_pass} onChange={this.handleChangePass} />
                                         </label>
                                           <input type="submit" value="Submit" />


                               </form>*/}


                                 <FormGroup
                                   controlId="formBasicText"

                                   validationState={this.getValidationState()}
                                 >
                                 {/*Look for email and password types on bootstrap*/}
                                 <FormControl
                                   type="text"
                                   style={{
                                    'width':'50%'
                                   }}
                                   value={this.state.email}
                                   placeholder="Enter email"
                                   onChange={this.handleChangeEmail}
                                 />

                                 <FormControl
                                   type="text"
                                   style={{
                                    'width':'50%'

                                   }}
                                   value={this.state.password}
                                   placeholder="Enter password"
                                   onChange={this.handleChangePassword}
                                 />

                               <Button bsStyle={'info'} onClick={this.onSubmit}>
                                 Submit
                               </Button>
                             </FormGroup>








                       </Panel>
                     </div>
          );
}

          if (this.state.login===true && this.state.failed_login === false){
            //I want to render  panel, an image and a link to the dashboard
            return (

                        <div className="block-center mt-xl wd-xl">
                             { /* START panel */ }
                             <div className="panel panel-dark panel-flat">
                                 <div className="panel-heading text-center">
                                     <a href="#">
                                         <img src="img/logo.png" alt="Image" className="block-center img-rounded" />
                                     </a>
                                 </div>
                                 <div className="panel-body">
                                    <Link to={'home'}> Go to dashboard </Link>



                               </div>


                             </div>
                           </div>
                );

          }


                if(this.state.login===false && this.state.failed_login===true){
                  //I want to return the panel, the text field and  a msg, your password is not good

                  return (

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
                                           <form onSubmit={this.onSubmit}>

                                           </form>
                                           <p className="text-center pv">YOUR EMAIL OR PASSWORD WAS WRONG.</p>

                                     </div>


                                   </div>
                                 </div>
                      );


                }






    }

}




export default LoginTwo;
