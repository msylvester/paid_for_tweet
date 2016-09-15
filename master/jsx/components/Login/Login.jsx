import React from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import FacebookButton  from '../Layout/FacebookButton';
import { Grid, Row, Col, Dropdown, MenuItem } from 'react-bootstrap';
import Firebase from 'firebase';
import ReactDOM from 'react-dom';
import { Router, Route, Link, hashHistory, browserHistory, IndexRoute } from 'react-router';

class Login extends React.Component {

	constructor() {
		super()
		
		this.state =  {

			login: false

		}

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
    bro
    console.log('connected' + uid)

  } else if (response.status === 'not_authorized') {
    // the user is logged in to Facebook, 
    // but has not authenticated your app

      console.log('connected but not authorized' + uid)
  } else {
    // the user isn't logged in to Facebook.
     console.log('not logged on' + uid)

  }
 });


	}
    render() {

    	if (this.state.login){
    		return(<Link to="/singleview"/>)

    	}
        return (
          	<ContentWrapper>

                <FacebookButton/>
      	</ContentWrapper>
        );
    }
}

export default Login;