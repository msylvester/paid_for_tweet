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
		


	}


    render() {


        return (


          
            <div 
               className="fb-login-button" 
               data-max-rows="1" 
               data-size="xlarge" 
               data-show-faces="false" 
               scope="public_profile,email, manage_pages, publish_pages"
               data-auto-logout-link="true"
               >
            </div>



        );
    }
}

export default Login;