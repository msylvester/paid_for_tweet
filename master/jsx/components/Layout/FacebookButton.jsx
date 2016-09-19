import React from 'react';
import { Router, Route, Link, hashHistory, browserHistory, IndexRoute } from 'react-router';
//import FBApp from '../modules/firebase';



/*
FacebookButton connects user to authentication via Facebook and firebase


*/

export default class FacebookButton extends React.Component {
   

   constructor(props) {
      super(props);
      //whats inside prps
      console.log(props);

   }

   componentDidMount() {

      // FB.Event.subscribe('auth.logout', 
      //    this.onLogout.bind(this));
      // FB.Event.subscribe('auth.statusChange', 
      //    this.onStatusChange.bind(this));



 //     FB.Event.subscribe('auth.authResponseChange', this.checkLoginState.bind(this));

     } 


 
   render() {
      console.log("i need ro render button");
      return (
         <div>
 



            <div 
               className="fb-login-button" 
               data-max-rows="1" 
               data-size="xlarge" 
               data-show-faces="false" 
               scope="public_profile,email, manage_pages, publish_pages"
               data-auto-logout-link="true"
               >
            </div>


         </div>

      );
   }
};